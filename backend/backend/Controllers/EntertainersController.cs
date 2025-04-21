using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainersController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        // GET: api/Entertainer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entertainer>>> GetEntertainers()
        {
            return await _context.Entertainers.ToListAsync();
        }

        // GET: api/Entertainer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);

            if (entertainer == null)
            {
                return NotFound();
            }

            return entertainer;
        }

        // POST: api/Entertainer
        [HttpPost]
        public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntertainer), new { id = entertainer.EntertainerId }, entertainer);
        }

        // PUT: api/Entertainer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
        {
            if (id != entertainer.EntertainerId)
            {
                return BadRequest();
            }

            _context.Entry(entertainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntertainerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Entertainer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntertainerExists(int id)
        {
            return _context.Entertainers.Any(e => e.EntertainerId == id);
        }
    }
}