import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsController } from './posts/posts.controller';
import { CategoriesController } from './categories/categories.controller';

@Module({
  controllers: [PostsController, CategoriesController],
  providers: [SocialService],
  imports: [PostsModule, CategoriesModule],
  exports: [SocialService],
})
export class SocialModule {}
