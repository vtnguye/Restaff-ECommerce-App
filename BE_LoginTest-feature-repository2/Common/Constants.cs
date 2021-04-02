using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Common
{
    public static class Constants
    {
        public static class Server
        {
            public static readonly string ErrorServer = "Internal Server Error";
        }
        public static class Account
        {
            public static readonly string InvalidAuthInfoMsg = "Invalid email or password";
        }

        public static class Data
        {
            public static readonly object InsertSuccess;
            public static readonly object UpdateSuccess;
            public static readonly object DeleteSuccess;
            public static readonly string UploadFail;
        }
    }
}
