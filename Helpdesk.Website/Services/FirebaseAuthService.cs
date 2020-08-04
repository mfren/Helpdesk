using System;
using System.Threading.Tasks;
using Firebase.Database;
using Firebase.Database.Query;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Helpdesk.Website.Models;

namespace Helpdesk.Website.Services
{
    public static class FirebaseAuthService
    {
        static readonly FirebaseClient FirebaseDB = new FirebaseClient("https://helpdesk-users.firebaseio.com");
        
        public static async Task<bool> CheckToken(bool adminNeeded, string jwt)
        {
            try
            {
                var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(jwt);

                var dbUser = await FirebaseDB
                    .Child("users")
                    .OrderByKey()
                    .StartAt(decodedToken.Uid)
                    .LimitToFirst(1)
                    .OnceAsync<User>();

                foreach (var user in dbUser)
                {
                    Console.WriteLine("User: " + user.Object.Roles["ADMIN"]);
                }
                
            }
            catch (FirebaseAdmin.Auth.FirebaseAuthException) { return false; }

            return true;
        }
    }
}