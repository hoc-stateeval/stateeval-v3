﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class AuthenticatedTokensDTO
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public AuthenticatedTokensDTO(string accessToken, string refreshToken)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
