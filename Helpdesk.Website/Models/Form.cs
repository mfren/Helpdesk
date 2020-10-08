using System;
using Newtonsoft.Json;

namespace Helpdesk.Website.Models
{
    public class Form
    {
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        [JsonProperty(PropertyName = "urg")]
        public string Urgency { get; set; }
        
        [JsonProperty(PropertyName = "cat")]
        public string Category { get; set; }

        public override string ToString()
        {
            return "Title: " + Title + "\nDescription: " + Description + "\nUrgency: " + Urgency + "\nCategory: " + Category;
        }
    }
}