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

export interface GetImagesParams {
  page?: number;
  perPage?: number;
  category?: string;
  searchQuery?: string;
}

export async function getImages({ page = 1, perPage = 10, category = 'all', searchQuery = '' }: GetImagesParams = {}): Promise<{ hits: PixabayImage[]; totalHits: number }> {
  if (!API_KEY) {
    console.error('API_KEY is missing');
    throw new Error('API_KEY не настроен. Пожалуйста, проверьте файл .env');
  }

  if (!API_BASE) {
    console.error('API_BASE is missing');
    throw new Error('API_BASE не настроен. Пожалуйста, проверьте файл .env');
  }

  const url = new URL(API_BASE);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('safesearch', 'true');

  const categoryIsAll = category === 'all';
  const hasSearchQuery = searchQuery.trim().length > 0;

  if (categoryIsAll && !hasSearchQuery) {
  } else if (categoryIsAll && hasSearchQuery) {
    url.searchParams.append('q', encodeURIComponent(searchQuery.trim()));
  } else if (!categoryIsAll && !hasSearchQuery) {
    url.searchParams.append('q', encodeURIComponent(category));
  } else {
    url.searchParams.append('q', encodeURIComponent(`${searchQuery.trim()} ${category}`));
  }

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
