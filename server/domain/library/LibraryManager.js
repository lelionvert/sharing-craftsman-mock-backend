'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class LibraryManager {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  getAllCategories() {
    return this.libraryRepository.getAll();
  }

  searchCategories(criteria) {
    let categories = this.libraryRepository.getAll();
    if (criteria.searchKeys.CategoryName)
      categories = categories.filter(category => category.name.indexOf(criteria.searchKeys.CategoryName) !== -1);
    return categories;
  }

  createCategory(category) {
    this.verifyCategory(category);
    category.id = uuidv1();
    category.knowledges = [];
    this.libraryRepository.add(category);
  }

  createKnowledge(knowledge) {
    this.verifyKnowledge();
    var knowledgeCategory = this.libraryRepository.getById(knowledge.categoryId);
    
    knowledge.id = uuidv1();
    if (knowledge.creator.length === 0)
      knowledge.creator = 'john@doe.fr';
    knowledgeCategory.knowledges.push(knowledge);
    this.libraryRepository.add(knowledgeCategory);
  }

  updateCategory(category) {
    this.verifyCategory(category);
    var categoryToUpdate = this.libraryRepository.getById(category.id);
    categoryToUpdate.name = category.name;
    this.libraryRepository.add(categoryToUpdate);
  }

  updateKnowledge(knowledge) {
    this.verifyKnowledge(knowledge);
    var categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    categoryToUpdate.knowledges[knowledge.id] = knowledge;
    this.libraryRepository.add(categoryToUpdate);
  }

  deleteCategory(category) {
    this.libraryRepository.delete(category.id);
  }

  deleteKnowledge(knowledge) {
    var categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    delete categoryToUpdate.knowledges[knowledge.id];
    this.libraryRepository.add(categoryToUpdate);
  }

  verifyCategory(favorite) {
    /*
    {
  "id": null,
  "name": "Architecture"
}
    */
  }

  verifyKnowledge(knowledge) {
    /*
{
  "id": "aaa",
  "categoryId": "aaa",
  "creator": "john@doe.fr",
  "title": "title",
  "content": "content"
}
    */
  }
}