using System;
using Newtonsoft.Json;

namespace Helpdesk.Website.Models
{
    public class Form
    {
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public int Rank { get; set; }
        
        [JsonProperty(PropertyName = "cat")]
        public string Category { get; set; }
        
        [JsonProperty(PropertyName = "sub-cat")]
        public string SubCategory { get; set; }
    }
}