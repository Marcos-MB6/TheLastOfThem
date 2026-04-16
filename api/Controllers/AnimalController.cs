using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    public class AnimalController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AnimalController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}