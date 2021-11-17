using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.API.Tests.Fixtures
{
    public interface ITestUser
    {
        public string DistrictName { get; }
        public string DistrictCode { get; }
        public string SchoolCode { get; }
        public string SchoolName { get; }
        public string UserName { get; }
    }

    public class DistrictNames
    {
        public static string DAN = "DAN SD";
        public static string CEL = "CEL SD";
        public static string MAR = "MAR SD";
        public static string Seattle = "DAN SPS SD";

        public static string CEL2 = "CEL 2 SD";
        public static string MAR2 = "MAR 2 SD";
    }
    public class DistrictCodes
    {
        public static string DAN = "10000";
        public static string CEL = "20000";
        public static string MAR = "30000";
        public static string Seattle = "17001";

        public static string CEL2 = "40000";
        public static string MAR2 = "50000";
    }

    public class TestUser : ITestUser
    {
        public TestUser(string districtName, string districtCode, string schoolName, string schoolCode, string userName)
        {
            DistrictName = districtName;
            DistrictCode = districtCode;
            SchoolName = schoolName;
            SchoolCode = schoolCode;
            UserName = userName;
        }

        public string DistrictName { get; set; }
        public string DistrictCode { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCode { get; set; }
        public string UserName { get; set; }
    }

    public class School
    {
        public School(string districtName, string districtCode, string schoolCode)
        {
            string schoolIndex = Convert.ToString(schoolCode[4]);

            DistrictName = districtName;
            DistrictCode = districtCode;
            SchoolName = $"{districtName} School {schoolIndex}";
            SchoolCode = schoolCode;

            TeacherA = CreateUser(RoleType.TR, schoolIndex, "A");
            TeacherB = CreateUser(RoleType.TR, schoolIndex, "B");
            TeacherC = CreateUser(RoleType.TR, schoolIndex, "C");
            TeacherD = CreateUser(RoleType.TR, schoolIndex, "D");
            PrincipalA = CreateUser(RoleType.PR, schoolIndex, "A");
            PrincipalB = CreateUser(RoleType.PR, schoolIndex, "B");
            SchoolAdmin = CreateUser(RoleType.SA, schoolIndex, "");
            HeadPrincipal = PrincipalB;

        }
        public string DistrictName { get; set; }
        public string DistrictCode { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCode { get; set; }

        public TestUser SchoolAdmin { get; set; }
        public TestUser TeacherA { get; set; }
        public TestUser TeacherB { get; set; }
        public TestUser TeacherC { get; set; }
        public TestUser TeacherD { get; set; }

        public TestUser PrincipalA { get; set; }
        public TestUser PrincipalB { get; set; }
        public TestUser HeadPrincipal { get; set; }

        public TestUser CreateUser(RoleType role, string schoolIndex, string nameIndex = "")
        {
            string roleDisplayName = EnumUtils.MapRoleTypeToDisplayName(role);
            if (String.IsNullOrEmpty(nameIndex))
            {
                string userName = $"{roleDisplayName} {DistrictName} School {schoolIndex}";
                return new TestUser(DistrictName, DistrictCode, SchoolName, SchoolCode, userName);
            }
            else
            {
                string userName = $"{roleDisplayName} {nameIndex} {DistrictName} School {schoolIndex}";
                return new TestUser(DistrictName, DistrictCode, SchoolName, SchoolCode, userName);
            }
        }
    }

    public class District
    {
        public District(string districtName, string districtCode)
        {
            DistrictName = districtName;
            DistrictCode = districtCode;

            DistrictAdmin = CreateUser(RoleType.DA);
            DistrictViewer = CreateUser(RoleType.DV);
            DistrictAssignmentManager = CreateUser(RoleType.DAM);
            DistrictEvaluator = CreateUser(RoleType.DE);
            DTE = CreateUser(RoleType.DTE);

            School1 = new School(DistrictName, DistrictCode, $"{districtCode[0]}{districtCode[1]}001");
            School2 = new School(DistrictName, DistrictCode, $"{districtCode[0]}{districtCode[1]}002");
        }

        public TestUser CreateUser(RoleType role, string nameIndex = "")
        {
            string roleDisplayName = EnumUtils.MapRoleTypeToDisplayName(role);
            if (String.IsNullOrEmpty(nameIndex))
            {
                string userName = $"{roleDisplayName} {DistrictName}";
                return new TestUser(DistrictName, DistrictCode, "", "", userName);
            }
            else
            {
                string userName = $"{roleDisplayName} {nameIndex} {DistrictName}";
                return new TestUser(DistrictName, DistrictCode, "", "", userName);
            }
        }

        public string DistrictName { get; set; }
        public string DistrictCode { get; set; }

        public School School1 { get; set; }
        public School School2 { get; set; }

        public TestUser DistrictAdmin { get; }
        public TestUser DistrictViewer { get; set; }
        public TestUser DTE { get; set; }
        public TestUser DistrictEvaluator { get; set; }
        public TestUser DistrictAssignmentManager { get; set; }
    }
}
