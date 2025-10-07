import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';

const mockTodo = {
  _id: '123',
  title: 'Test Todo',
  description: 'Testing...',
  completed: false,
  save: jest.fn().mockResolvedValue(this),
};

describe('TodoService', () => {
  let service: TodoService;

  // mock implementation of Mongoose model
  function mockTodoModel(dto) {
    return {
      ...dto,
      save: jest.fn().mockResolvedValue({ _id: '123', ...dto }),
    };
  }

    // attach static methods to the constructor function
  mockTodoModel.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockTodo]),
  });

  mockTodoModel.findById = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTodo),
  });

  mockTodoModel.findByIdAndUpdate = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ ...mockTodo, completed: true }),
  });

  mockTodoModel.findByIdAndDelete = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTodo),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: getModelToken(Todo.name), useValue: mockTodoModel },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const result = await service.create({ title: 'Test Todo' });
    expect(result.title).toBe('Test Todo');
  });

  it('should return all todos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockTodo]);
  });

  it('should return one todo', async () => {
    const result = await service.findOne('123');
    expect(result).toEqual(mockTodo);
  });

  it('should update a todo', async () => {
    const result = await service.update('123', { completed: true });
    expect(result.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    await expect(service.remove('123')).resolves.toBeUndefined();
  });
});
