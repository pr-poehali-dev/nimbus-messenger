import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { users, posts, getAllPosts, getUserById, likePost, addComment, createPost, formatTimeAgo, type Post, type User } from '@/lib/database';

const Index = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // landing, auth, chat, video, feed
  const [newMessage, setNewMessage] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const currentUserId = '1'; // Симуляция текущего пользователя

  const contacts = [
    { id: 1, name: 'Анна Петрова', status: 'online', lastMessage: 'Привет! Как дела?', time: '12:30', avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg' },
    { id: 2, name: 'Иван Сидоров', status: 'away', lastMessage: 'Готовы к завтрашней встрече?', time: '11:45', avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg' },
    { id: 3, name: 'Мария Иванова', status: 'offline', lastMessage: 'Отправила файлы по проекту', time: '10:20', avatar: '/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg' }
  ];

  const messages = [
    { id: 1, sender: 'Анна Петрова', content: 'Привет! Как твои дела?', time: '12:30', isOwn: false },
    { id: 2, sender: 'Вы', content: 'Привет! Всё отлично, спасибо! Ты как?', time: '12:32', isOwn: true },
    { id: 3, sender: 'Анна Петрова', content: 'Тоже всё хорошо) Слушай, ты не мог бы помочь мне с проектом?', time: '12:33', isOwn: false }
  ];

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/80 border-b border-purple-100">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Nimbus
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setCurrentView('auth')}>
                Войти
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => { setIsRegistering(true); setCurrentView('auth'); }}
              >
                Регистрация
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCurrentView('feed')}
                className="border-purple-200 text-purple-600"
              >
                Лента
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                Новый уровень общения
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Nimbus — современный мессенджер с HD видеозвонками, защищенными сообщениями и демонстрацией экрана
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2 text-sm font-medium">
                  <Icon name="Shield" size={16} className="mr-2" />
                  End-to-end шифрование
                </Badge>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-medium">
                  <Icon name="Video" size={16} className="mr-2" />
                  HD видеозвонки
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2 text-sm font-medium">
                  <Icon name="Monitor" size={16} className="mr-2" />
                  Демонстрация экрана
                </Badge>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => setCurrentView('chat')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Чат
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => setCurrentView('feed')}
                >
                  <Icon name="Rss" size={20} className="mr-2" />
                  Лента новостей
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="Lock" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Безопасность</h3>
                  <p className="text-gray-600">Все сообщения защищены end-to-end шифрованием. Ваши переписки останутся конфиденциальными.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="Zap" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Скорость</h3>
                  <p className="text-gray-600">Мгновенная доставка сообщений в любую точку мира. Никаких задержек и зависаний.</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon name="Palette" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Дизайн</h3>
                  <p className="text-gray-600">Удобный и современный интерфейс с поддержкой темной и светлой темы на ваш выбор.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (currentView === 'feed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/80 border-b border-purple-100 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Nimbus
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('chat')}>
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Чат
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView('landing')}
              >
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 max-w-2xl">
          {/* Create Post */}
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
                  <AvatarFallback>АП</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea 
                    placeholder="Что у вас нового?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border-purple-200 focus:border-purple-500 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        <Icon name="Image" size={16} className="mr-2" />
                        Фото
                      </Button>
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        <Icon name="Video" size={16} className="mr-2" />
                        Видео
                      </Button>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => {
                        if (newPost.trim()) {
                          createPost({
                            authorId: currentUserId,
                            content: newPost,
                            type: 'text'
                          });
                          setNewPost('');
                        }
                      }}
                      disabled={!newPost.trim()}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {getAllPosts().map((post) => {
              const author = getUserById(post.authorId);
              if (!author) return null;

              return (
                <Card key={post.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{author.name}</h3>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          author.status === 'online' ? 'bg-green-500' : 
                          author.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-xs text-gray-500 capitalize">{author.status}</span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-gray-800 leading-relaxed">{post.content}</p>
                      {post.images && post.images.length > 0 && (
                        <div className="mt-4 grid gap-2">
                          {post.images.map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt="Post image" 
                              className="rounded-lg w-full max-h-96 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center gap-4 mb-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => likePost(post.id, currentUserId)}
                        className={`text-gray-600 hover:text-purple-600 ${
                          post.likes.includes(currentUserId) ? 'text-purple-600 bg-purple-50' : ''
                        }`}
                      >
                        <Icon name="Heart" size={16} className="mr-2" />
                        {post.likes.length}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                        className="text-gray-600 hover:text-purple-600"
                      >
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        {post.comments.length}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                        <Icon name="Share" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>

                    {/* Comments */}
                    {showComments === post.id && (
                      <div className="border-t border-gray-100 pt-4 space-y-4">
                        {/* Add Comment */}
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
                            <AvatarFallback>Вы</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input 
                              placeholder="Написать комментарий..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="border-purple-200 focus:border-purple-500"
                            />
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                              onClick={() => {
                                if (newComment.trim()) {
                                  addComment(post.id, {
                                    authorId: currentUserId,
                                    postId: post.id,
                                    content: newComment,
                                    likes: [],
                                    createdAt: new Date()
                                  });
                                  setNewComment('');
                                }
                              }}
                              disabled={!newComment.trim()}
                            >
                              <Icon name="Send" size={14} />
                            </Button>
                          </div>
                        </div>

                        {/* Comments List */}
                        {post.comments.map((comment) => {
                          const commentAuthor = getUserById(comment.authorId);
                          if (!commentAuthor) return null;

                          return (
                            <div key={comment.id} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={commentAuthor.avatar} />
                                <AvatarFallback>{commentAuthor.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                  <h4 className="font-medium text-sm text-gray-900">{commentAuthor.name}</h4>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-purple-600 h-auto p-0">
                                    Нравится ({comment.likes.length})
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="MessageCircle" size={28} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isRegistering ? 'Регистрация' : 'Авторизация'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isRegistering && (
              <div className="space-y-4">
                <Input placeholder="Имя" className="border-purple-200 focus:border-purple-500" />
                <Input placeholder="Фамилия" className="border-purple-200 focus:border-purple-500" />
              </div>
            )}
            <div className="space-y-4">
              <Input placeholder="Email" type="email" className="border-purple-200 focus:border-purple-500" />
              <Input placeholder="Пароль" type="password" className="border-purple-200 focus:border-purple-500" />
              {isRegistering && (
                <Input placeholder="Подтвердите пароль" type="password" className="border-purple-200 focus:border-purple-500" />
              )}
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => setCurrentView('feed')}
            >
              {isRegistering ? 'Создать аккаунт' : 'Войти'}
            </Button>
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-purple-600"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-purple-200 text-purple-600"
              onClick={() => setCurrentView('landing')}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'video') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Video Call Header */}
        <div className="bg-black/50 backdrop-blur-md p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
              <AvatarFallback>АП</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Анна Петрова</h3>
              <p className="text-sm text-gray-300">HD видеозвонок • 05:23</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white px-3 py-1">
              <Icon name="Wifi" size={12} className="mr-1" />
              HD
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('chat')}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-gradient-to-br from-purple-900 to-indigo-900">
          {/* Main Video */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-video bg-black/30 rounded-lg flex items-center justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
                <AvatarFallback className="text-4xl">АП</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Self Video */}
          <div className="absolute top-4 right-4 w-48 aspect-video bg-black/50 rounded-lg flex items-center justify-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
              <AvatarFallback>Вы</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Video Controls */}
        <div className="bg-black/70 backdrop-blur-md p-6">
          <div className="flex justify-center items-center gap-4">
            <Button size="lg" className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-12 h-12 p-0">
              <Icon name="Mic" size={20} />
            </Button>
            <Button size="lg" className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-12 h-12 p-0">
              <Icon name="Video" size={20} />
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 p-0">
              <Icon name="Monitor" size={24} />
            </Button>
            <Button size="lg" className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-12 h-12 p-0">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 p-0">
              <Icon name="PhoneOff" size={20} />
            </Button>
          </div>
          <p className="text-center text-white/70 text-sm mt-4">
            Нажмите на экран для демонстрации экрана в HD качестве
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
          <Icon name="MessageCircle" size={20} className="text-white" />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-12 h-12 p-0 rounded-xl"
          onClick={() => setCurrentView('feed')}
        >
          <Icon name="Rss" size={20} />
        </Button>
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 rounded-xl">
          <Icon name="Users" size={20} />
        </Button>
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 rounded-xl">
          <Icon name="Settings" size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-12 h-12 p-0 rounded-xl"
          onClick={() => setCurrentView('landing')}
        >
          <Icon name="LogOut" size={20} />
        </Button>
      </div>

      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Поиск контактов..." className="pl-10 border-gray-200 focus:border-purple-500" />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-green-500' : 
                    contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
              <AvatarFallback>АП</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Анна Петрова</h3>
              <p className="text-sm text-green-600">в сети</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('video')}
              className="hover:bg-purple-50 hover:text-purple-600"
            >
              <Icon name="Video" size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
              <Icon name="Phone" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 rounded-2xl ${
                  message.isOwn 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
              {!message.isOwn && (
                <Avatar className="w-8 h-8 order-1 mr-2">
                  <AvatarImage src="/img/9a579dac-1202-452e-86c8-dca17eccc870.jpg" />
                  <AvatarFallback>АП</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Icon name="Plus" size={16} />
            </Button>
            <div className="flex-1 relative">
              <Input 
                placeholder="Напишите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="pr-12 border-gray-200 focus:border-purple-500 rounded-full"
              />
              <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Icon name="Send" size={14} />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Icon name="Smile" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;