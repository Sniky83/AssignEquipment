using API.Models.EntityDB;
using API.Models.Requests.Common;

namespace API.Helpers
{
    public class CommonHelper
    {
        private readonly MyDbContext _context;

        public CommonHelper(MyDbContext context)
        {
            _context = context;
        }

        public List<CollaboraterFiltersResponse> CollaboraterFilter(CollaboterFiltersParameters QueryParams, bool isHomeFilter = false)
        {
            var collabList = _context.Collaborateurs.ToList();
            var fonctionList = _context.Fonctions.ToList();

            var query = collabList.Join(fonctionList,
                collaborateur => collaborateur.IdFonction,
                fonction => fonction.IdFonction,
                (collaborateur, fonction) => new CollaboraterFiltersResponse(collaborateur, fonction)).AsQueryable();

            //Si le paramètre n'est pas vide alors on rajoute la where clause
            if (!string.IsNullOrEmpty(QueryParams.Keyword))
            {
                query = query.Where(
                    cf => 
                        cf.Collaborateur.Nom.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        cf.Collaborateur.Prenom.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        cf.Collaborateur.Uname.ToLower().Contains(QueryParams.Keyword.ToLower())
                );
            }

            if (QueryParams.IdFonction > 0)
            {
                query = query.Where(cf => cf.Collaborateur.IdFonction == QueryParams.IdFonction);
            }

            //Si on filtre sur la Home page on affiche que les actifs.
            //Le filtre sur les collaborateurs ne prends pas en compte cette règle car on doit avoir une visibilité sur tous les Collaborateurs.
            if(isHomeFilter)
            {
                query = query.Where(cf => cf.Collaborateur.IsActif == true);
            }
            else
            {
                query = query.Where(cf => cf.Collaborateur.IsActif == QueryParams.IsActif);
            }

            return query.ToList();
        }
    }
}
