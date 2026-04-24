'use server';

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

const API_BASE = process.env.API_BASE || 'https://pixabay.com/api/';
const API_KEY = process.env.API_KEY;

export async function getImages(page: number = 1, perPage: number = 10): Promise<{ hits: PixabayImage[]; totalHits: number }> {
  if (!API_KEY) {
    console.error('API_KEY is missing');
    throw new Error('API_KEY не настроен. Пожалуйста, проверьте файл .env');
  }

  if (!API_BASE) {
    console.error('API_BASE is missing');
    throw new Error('API_BASE не настроен. Пожалуйста, проверьте файл .env');
  }

  // Оптимизация запроса: запрашиваем только необходимые поля, если API это поддерживает
  // Pixabay не поддерживает выбор полей, но мы ограничиваем количество
  const url = new URL(API_BASE);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('safesearch', 'true');
  url.searchParams.append('editors_choice', 'true'); // Для более качественных фото

  try {
    const response = await fetch(url.toString(), {
      // Кэширование ответа на 1 час
      next: { revalidate: 3600, tags: ['images'] }
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error('Неверный API ключ (401/403). Проверьте API_KEY в .env');
    }

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
    }

    const data: PixabayResponse = await response.json();

    if (!data.hits || data.hits.length === 0) {
      throw new Error('Изображения не найдены');
    }

    return { hits: data.hits, totalHits: data.totalHits };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Сетевая ошибка или API недоступен. Проверьте подключение к интернету');
    }
    throw error;
  }
}
