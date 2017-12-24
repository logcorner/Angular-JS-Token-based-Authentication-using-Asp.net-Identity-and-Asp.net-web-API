using APM.WebAPI.Models;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;

namespace AspNetWebApiAngularJsAuthenticationToken.Controllers
{
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                var productRepository = new ProductRepository();
                return Ok(productRepository.Retrieve().AsQueryable());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}