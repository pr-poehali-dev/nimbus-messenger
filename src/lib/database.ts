// Симуляция базы данных для демонстрации
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  bio?: string;
  joinedAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  likes: string[]; // user IDs
  comments: Comment[];
  createdAt: Date;
  type: 'text' | 'image' | 'video';
}

export interface Comment {
  id: string;
  authorId: string;
  postId: string;
  content: string;
  likes: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file';
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
}

// Моковые данные
export const users: User[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    email: 'anna@example.com',
    avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg',
    status: 'online',
    bio: 'UX/UI Designer в стартапе',
    joinedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Иван Сидоров',
    email: 'ivan@example.com',
    avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg',
    status: 'away',
    bio: 'Frontend разработчик',
    joinedAt: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Мария Иванова',
    email: 'maria@example.com',
    avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg',
    status: 'offline',
    bio: 'Project Manager',
    joinedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    name: 'Алексей Смирнов',
    email: 'alex@example.com',
    avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg',
    status: 'online',
    bio: 'Fullstack Developer',
    joinedAt: new Date('2024-03-05')
  }
];

export const posts: Post[] = [
  {
    id: '1',
    authorId: '1',
    content: 'Только что закончила работу над новым дизайном приложения! Очень довольна результатом 🎨✨',
    images: ['/img/36861d36-dcfa-43db-85f2-9a11a6da8954.jpg'],
    likes: ['2', '3', '4'],
    comments: [
      {
        id: '1',
        authorId: '2',
        postId: '1',
        content: 'Выглядит потрясающе! Отличная работа 👏',
        likes: ['1'],
        createdAt: new Date('2025-01-19T14:35:00')
      },
      {
        id: '2',
        authorId: '3',
        postId: '1',
        content: 'Когда релиз? Уже хочется попробовать!',
        likes: ['1', '2'],
        createdAt: new Date('2025-01-19T14:40:00')
      }
    ],
    createdAt: new Date('2025-01-19T14:30:00'),
    type: 'image'
  },
  {
    id: '2',
    authorId: '2',
    content: 'Изучаю новый фреймворк для работы. React становится всё лучше с каждым обновлением! 💻',
    likes: ['1', '4'],
    comments: [
      {
        id: '3',
        authorId: '4',
        postId: '2',
        content: 'Полностью согласен! Hooks изменили всё к лучшему',
        likes: ['2'],
        createdAt: new Date('2025-01-19T13:20:00')
      }
    ],
    createdAt: new Date('2025-01-19T13:15:00'),
    type: 'text'
  },
  {
    id: '3',
    authorId: '4',
    content: 'Команда! Кто готов к новому спринту? Будет интересно! 🚀',
    likes: ['1', '2', '3'],
    comments: [],
    createdAt: new Date('2025-01-19T12:00:00'),
    type: 'text'
  },
  {
    id: '4',
    authorId: '3',
    content: 'Поделилась планами на квартал с командой. Амбициозные цели впереди! 📈',
    images: ['/img/36861d36-dcfa-43db-85f2-9a11a6da8954.jpg'],
    likes: ['1', '2'],
    comments: [
      {
        id: '4',
        authorId: '1',
        postId: '4',
        content: 'Отлично структурировано! Видно профессиональный подход',
        likes: ['3'],
        createdAt: new Date('2025-01-19T11:30:00')
      }
    ],
    createdAt: new Date('2025-01-19T11:00:00'),
    type: 'image'
  }
];

// Функции для работы с данными
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.authorId === userId);
};

export const getAllPosts = (): Post[] => {
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const likePost = (postId: string, userId: string): boolean => {
  const post = posts.find(p => p.id === postId);
  if (!post) return false;
  
  const likeIndex = post.likes.indexOf(userId);
  if (likeIndex > -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(userId);
  }
  return true;
};

export const addComment = (postId: string, comment: Omit<Comment, 'id'>): Comment | null => {
  const post = posts.find(p => p.id === postId);
  if (!post) return null;
  
  const newComment: Comment = {
    ...comment,
    id: Date.now().toString()
  };
  
  post.comments.push(newComment);
  return newComment;
};

export const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>): Post => {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    likes: [],
    comments: [],
    createdAt: new Date()
  };
  
  posts.unshift(newPost);
  return newPost;
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'только что';
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ч назад`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} дн назад`;
  
  return date.toLocaleDateString('ru-RU');
};