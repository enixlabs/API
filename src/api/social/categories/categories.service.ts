import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryNotFoundException from './notFound.exc';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: {
        posts: true,
      },
    });
  }
  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
      withDeleted: true,
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async restoreDeletedCategory(id: string) {
    const restoreResponse = await this.categoriesRepository.restore(id);
    if (!restoreResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  async deleteCategoryById(id: string): Promise<void> {
    return this.deleteCategory(id);
  }

  async deleteCategory(id: string): Promise<void> {
    const deleteResponse = await this.categoriesRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }
}
