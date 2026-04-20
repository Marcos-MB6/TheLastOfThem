using System.Security.Cryptography;
using System.Text;
using api.Controllers;
using api.DTOs;
using api.Models;
using Microsoft.VisualBasic.FileIO;

namespace API.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        if (!context.Usuarios.Any())
        {
            using var hmac = new HMACSHA512();

            RegisterDTO registerAdmin = new RegisterDTO
            {
                Username = "MarcosMB",
                Password = "12345"
            };

            User usuarioAdmin = new User
            {
                Username = registerAdmin.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerAdmin.Password)),
                PasswordSalt = hmac.Key,
                Tipo = "Admin"
            };

            context.Usuarios.Add(usuarioAdmin);
        }




        if (!context.Animales.Any())
        {
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

                    Animal animal = new Animal
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
                        Amenazas = columnas[9],
                        Continente = columnas[10]
                    };

                    context.Animales.Add(animal);
                }
            }

            context.SaveChanges();
        }

    }
}