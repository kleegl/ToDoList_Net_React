using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ReactASPNetCRUD.Models;
using ReactASPNetCRUD.Repositories;
using ReactASPNetCRUD.Repositories.Interfaces;

namespace ReactASPNetCRUD.Controllers
{
    [Produces("application/json")]
    //[Route("[controller]")]
    //[Route("api/[controller][action]")]
    [Route("[controller][action]")]
    [ApiController]
    [EnableCors("CORSPolicy")]
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            return new JsonResult(_postRepository.GetAllPosts().Result);
        }

        [HttpGet]
        public JsonResult GetById(int postId)
        {
            return new JsonResult(_postRepository.GetPostById(postId).Result);
        }

        [HttpPost]
        public JsonResult Create(Post postToCreate)
        {
            return new JsonResult(_postRepository.CreatePost(postToCreate).Result);
        }

        [HttpPut]
        public JsonResult Update(Post postToUpdate)
        {
            return new JsonResult(_postRepository.UpdatePost(postToUpdate).Result);
        }

        [HttpDelete]
        public JsonResult Delete(int postIdToDelete)
        {
            return new JsonResult(_postRepository.DeletePost(postIdToDelete).Result);
        }

    }
}
