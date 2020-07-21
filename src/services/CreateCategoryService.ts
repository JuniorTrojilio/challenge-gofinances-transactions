import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<string> {
    const categoriesRepository = getRepository(Category);

    let categoryData = await categoriesRepository.findOne({
      where: {
        title,
      },
    });

    if (categoryData) {
      return categoryData.id;
    }

    categoryData = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(categoryData);

    return categoryData.id;
  }
}

export default CreateCategoryService;
