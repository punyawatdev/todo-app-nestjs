import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const mockTodo = {
  _id: '123',
  title: 'Test Todo',
  description: 'Testing...',
  completed: false,
};

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;
  
  // mock implementation of TodoService
  const mockTodoService = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue([mockTodo]),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue({ ...mockTodo, completed: true }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   it('should create a todo', async () => {
    const result = await controller.create({ title: 'Test Todo' });
    expect(result).toEqual(mockTodo);
    expect(mockTodoService.create).toHaveBeenCalledWith({
      title: 'Test Todo',
    });
  });

  it('should return all todos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockTodo]);
  });

  it('should return a todo by id', async () => {
    const result = await controller.findOne('123');
    expect(result).toEqual(mockTodo);
  });

  it('should update a todo by id', async () => {
    const result = await controller.update('123', { completed: true });
    expect(result).toEqual({ ...mockTodo, completed: true });
    expect(mockTodoService.update).toHaveBeenCalledWith('123', {
      completed: true,
    });
  });
  
  it('should delete a todo by id', async () => {
    const result = await controller.remove('123');
    expect(result).toBeUndefined();
    expect(mockTodoService.remove).toHaveBeenCalledWith('123');
  });
});
