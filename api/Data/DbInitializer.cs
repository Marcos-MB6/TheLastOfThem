

using api.Models;

namespace API.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {

        if (context.Animales.Any())
        {
            return; 
        }

        var rutaCsv = "Data/SeedData/assessments.csv";

        if (!File.Exists(rutaCsv)) return;

        var lineas = File.ReadAllLines(rutaCsv);

        foreach (var linea in lineas.Skip(1))
        {
            var columnas = linea.Split(',');

            var animal = new Animal
            {
                NombreCientifico = columnas[2],
                Categoria = columnas[3]
            };

            context.Animales.Add(animal);
        }

        context.SaveChanges();
    }
}