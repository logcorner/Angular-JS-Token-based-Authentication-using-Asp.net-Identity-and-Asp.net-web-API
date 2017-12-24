using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Hosting;

namespace APM.WebAPI.Models
{
    public class ProductRepository
    {
        internal List<Product> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");

            var json = System.IO.File.ReadAllText(filePath);

            var products = JsonConvert.DeserializeObject<List<Product>>(json);

            return products;
        }
    }
}