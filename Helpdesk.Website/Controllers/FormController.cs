using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Helpdesk.Website.Models;
using Helpdesk.Website.Services;

namespace Helpdesk.Website.Controllers
{
    [ApiController]
    [Route("api/form")]
    public class FormController : Controller
    {
        [HttpPost]
        public async Task<bool> GetForm([FromHeader] string firebaseJWT, [FromBody] Form form)
        {
            Console.WriteLine(firebaseJWT, form);
            return await FirebaseAuthService.CheckUserToken(firebaseJWT);
        }
    }
}