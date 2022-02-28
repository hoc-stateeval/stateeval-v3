using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SE.Core.Common
{
    public static class WebUtils
    {
        public static string MakeTinyUrl(string url)
        {
            try
            {
                var request = WebRequest.Create("http://tinyurl.com/api-create.php?url=" + HttpUtility.UrlEncode(url));
                var res = request.GetResponse();
                string text;
                using (var reader = new StreamReader(res.GetResponseStream()))
                {
                    text = reader.ReadToEnd();
                }
                return text;
            }
            catch (Exception)
            {
                return url;
            }
        }
    }
}
