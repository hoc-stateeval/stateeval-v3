using DbUp;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using DbUpMigrationRunner.Environments;
using DbUpMigrationRunner.Seed_Data;
using System.Collections.Generic;
using System.Reflection;
using DbUp.Helpers;


// This process is based on article:
// https://dasith.me/2020/06/08/database-project-conversion-to-migrations/

namespace DbUpMigrationRunner
{
    static class Program
    {
        static Task Main(string[] args) =>
                CreateHostBuilder(args).Build().RunAsync();

        static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
           .ConfigureAppConfiguration((hostingContext, builder) =>
           {
               builder.Sources.Clear();

               //    IHostEnvironment env = hostingContext.HostingEnvironment;

               var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

               builder
                   .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                   .AddJsonFile($"appsettings.{env}.json", true, true);

               IConfigurationRoot configuration = builder.Build();

               try
               {
                   WriteToConsole($"Database Migration Runner. " +
                        $"Version={typeof(DbUp.DeployChanges).Assembly.GetName().Version}");

                   // NOTE: PLEASE MAKE SURE YOUR SCRIPT IS MARKED AS EMBEDDED
                   // https://www.c-sharpcorner.com/uploadfile/40e97e/saving-an-embedded-file-in-C-Sharp/
                   WriteToConsole("\nIMPORTANT: Please ensure your scripts are EMBEDDED in the executable.");

                   var baseNamespace = typeof(Program).Namespace;
                   var baseEnvironmentsNamespace = typeof(IEnvironmentsFolderMarker).Namespace;
                   var baseSeedNamespace = typeof(ISeedDataFolderMarker).Namespace;

                   // You can use IConfiguration (Microsoft.Extensions.Configuration)
                   // https://stackoverflow.com/questions/38114761/asp-net-core-configuration-for-net-core-console-application

                   var configSettings = configuration.GetSection("MigrationSettings").Get<MigrationConfigSettings>();
                   var connectionString = configuration.GetConnectionString("localDb");

                   // Migrations
                   WriteToConsole("Start executing migration scripts...");
                   var migrationScriptsPath = baseNamespace + ".Migrations";
                   RunMigrations(connectionString, migrationScriptsPath, /*variables, */ false);

                   WriteToConsole("Start executing sprocs scripts...");
                   migrationScriptsPath = baseNamespace + ".StoredProcedures";
                   RunMigrations(connectionString, migrationScriptsPath, /*variables, */ false);

                   WriteToConsole("Start executing seed data migration scripts...");
                   migrationScriptsPath = baseNamespace + ".SeedData.Core";
                   RunMigrations(connectionString, migrationScriptsPath, /*variables, */ false);

                   WriteToConsole("Start executing seed data environment migration scripts...");
                   migrationScriptsPath = baseNamespace + ".SeedData." + env;
                   RunMigrations(connectionString, migrationScriptsPath, /*variables, */ false);
               }
               catch (Exception e)
               {
                   WriteToConsole(e.Message, ConsoleColor.Red);

                   Environment.Exit(-1);
               }

               Environment.Exit(0);
           });

        private static int RunMigrations(string connectionString, string @namespace,
                        /*Dictionary<string, string> variables,*/ bool alwaysRun = false)
        {
            WriteToConsole($"Executing scripts in {@namespace}");

            var builder = DeployChanges.To
                .SqlDatabase(connectionString)
                .WithTransaction()
                //   .WithVariables(variables)
                .WithScriptsEmbeddedInAssembly(
                    Assembly.GetExecutingAssembly(), file =>
                    {
                        return file
                        .ToLower()
                        .StartsWith(@namespace.ToLower());
                    })
                .LogToConsole();

            builder = alwaysRun ?
                 builder.JournalTo(new NullJournal()) :
                 builder.JournalToSqlTable("dbo", "DatabaseMigrations");

            var executor = builder.Build();
            var result = executor.PerformUpgrade();

            if (!result.Successful)
            {
                throw new Exception(result.Error.ToString());
            }

            ShowSuccess();
            return 0;
        }

        private static void ShowSuccess() =>
            WriteToConsole("Success!", ConsoleColor.Green);


        private static void WriteToConsole(string msg, ConsoleColor color = ConsoleColor.Green)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(msg);
            Console.ResetColor();
        }
    }
}

//var additionalPreDeploymentNamespace =
//    ConfigurationManager.AppSettings["AdditionalPreDeploymentNamespace"];
//if (!string.IsNullOrWhiteSpace(additionalPreDeploymentNamespace))
//{
//    additionalPreDeploymentNamespace = baseEnvironmentsNamespace +
//         "." + additionalPreDeploymentNamespace;
//}
//var additionalPostDeploymentNamespace =
//    ConfigurationManager.AppSettings["AdditionalPostDeploymentNamespace"];
//if (!string.IsNullOrWhiteSpace(additionalPostDeploymentNamespace))
//{
//    additionalPostDeploymentNamespace = baseEnvironmentsNamespace +
//         "." + additionalPostDeploymentNamespace;
//}


//WriteToConsole("\nListing variables...\n");
//var variables = new Dictionary<string, string>();

//foreach (var k in ConfigurationManager.AppSettings.AllKeys)
//{
//    variables.Add(k, ConfigurationManager.AppSettings[k]);
//    WriteToConsole($"${k}$ = \"{ConfigurationManager.AppSettings[k]}\"");
//    // See how to use variables in your scripts: 
//    // https://dbup.readthedocs.io/en/latest/more-info/variable-substitution/
//}


// Pre deployments
//WriteToConsole("Start executing predeployment scripts...");
//string preDeploymentScriptsPath = baseNamespace + ".PreDeployment";
//RunMigrations(connectionString,
//    preDeploymentScriptsPath, variables, true);

//if (!string.IsNullOrWhiteSpace(additionalPreDeploymentNamespace))
//{
//    RunMigrations(connectionString,
//        additionalPreDeploymentNamespace, variables, true);
//}


// Post deployments
//WriteToConsole("Start executing postdeployment scripts...");
//string postdeploymentScriptsPath = baseNamespace + ".PostDeployment";
//RunMigrations(connectionString,
//    postdeploymentScriptsPath, variables, true);

//if (!string.IsNullOrWhiteSpace(additionalPostDeploymentNamespace))
//{
//    RunMigrations(connectionString,
//        additionalPostDeploymentNamespace, variables, true);
//}
