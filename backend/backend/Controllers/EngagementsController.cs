using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.Linq;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class EngagementsController : ControllerBase
{
    private readonly EntertainmentAgencyExampleContext _context;

    public EngagementsController(EntertainmentAgencyExampleContext context)
    {
        _context = context;
    }

    [HttpGet("entertainer-stats")]
    public async Task<IActionResult> GetEntertainerEngagementStats()
    {
        var stats = await _context.Engagements
            .GroupBy(e => e.EntertainerId)
            .Select(g => new
            {
                EntertainerId = g.Key,
                EngagementCount = g.Count(),
                MostRecentDate = g.Max(e => e.StartDate)
            })
            .ToListAsync();

        return Ok(stats);
    }
}