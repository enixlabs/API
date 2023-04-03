import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostNotFoundException from './notFound.exc';
import CreatePostDto from './dto/createPost.entity';
import { User } from '../../user/entities/user.entity';
import UpdatePostDto from './dto/updatePost.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: string, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });
    if (!updatedPost) {
      throw new PostNotFoundException(id);
    }
    return updatedPost;
  }

  async deletePost(id: string) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
