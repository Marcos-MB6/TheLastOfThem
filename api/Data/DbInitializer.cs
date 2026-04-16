using api.Models;
using Microsoft.VisualBasic.FileIO;

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

        using (TextFieldParser parser = new TextFieldParser(rutaCsv))
        {
            parser.TextFieldType = FieldType.Delimited;
            parser.SetDelimiters(",");
            parser.HasFieldsEnclosedInQuotes = true;

            parser.ReadLine();

            while (!parser.EndOfData)
            {
                string[] columnas = parser.ReadFields();

                var animal = new Animal
                {
                    NombreComun = columnas[0],
                    NombreCientifico = columnas[1],
                    Categoria = columnas[2],
                    Reino = columnas[3],
                    Orden = columnas[4],
                    Familia = columnas[5],
                    Genero = columnas[6],
                    Especie = columnas[7],
                    Justificacion = columnas[8],
                    Amenazas = columnas[9]
                };

                context.Animales.Add(animal);
            }
        }

        context.SaveChanges();
    }
}