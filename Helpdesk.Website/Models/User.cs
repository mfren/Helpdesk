using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Helpdesk.Website.Models
{
    public class User
    {
        public string Email { get; set; }
        public Dictionary<string, bool> Roles { get; set; }

        public override string ToString()
        {
            return Email + " " + Roles.ToString();
        }
    }
}