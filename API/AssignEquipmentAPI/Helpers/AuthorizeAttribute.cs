using API.Models.EntityDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (Collaborateur)(context.HttpContext.Items["User"]);

            if (user == null)
            {
                // Si l'utilisateur n'est pas connecté
                context.Result = new JsonResult(new { message = "Accès non autorisé !" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}