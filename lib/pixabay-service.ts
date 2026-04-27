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
  const CURRENT_KEY = API_KEY || process.env.API_KEY;
  const CURRENT_BASE = (API_BASE || process.env.API_BASE || 'https://pixabay.com/api/').trim();

  if (!CURRENT_KEY) {
    console.error('API_KEY is missing');
    throw new Error('API_KEY не настроен. Пожалуйста, проверьте файл .env');
  }

  const url = new URL(CURRENT_BASE);
  url.searchParams.append('key', CURRENT_KEY);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('safesearch', 'true');

  const categoryIsAll = category === 'all';
  const hasSearchQuery = searchQuery.trim().length > 0;

  if (categoryIsAll && hasSearchQuery) {
    url.searchParams.append('q', searchQuery.trim());
  } else if (!categoryIsAll) {
    // Pixabay supports specific categories. If it's one of them, use the category parameter.
    // Otherwise, append to search query.
    const supportedCategories = [
      'fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 
      'feelings', 'religion', 'health', 'places', 'animals', 'industry', 
      'food', 'computer', 'sports', 'transportation', 'travel', 'buildings', 
      'business', 'music'
    ];
    
    const normalizedCategory = category.toLowerCase();
    if (supportedCategories.includes(normalizedCategory)) {
      url.searchParams.append('category', normalizedCategory);
    } else {
      // Fallback: add to query if not a standard Pixabay category
      const currentQ = url.searchParams.get('q') || '';
      url.searchParams.set('q', `${currentQ} ${category}`.trim());
    }

    if (hasSearchQuery) {
      const currentQ = url.searchParams.get('q') || '';
      url.searchParams.set('q', `${currentQ} ${searchQuery.trim()}`.trim());
    }
  }

  // Pixabay limit: q parameter must not exceed 100 characters
  const finalQ = url.searchParams.get('q');
  if (finalQ && finalQ.length > 100) {
    console.warn(`[Pixabay API Warning] Query is too long (${finalQ.length} chars). Truncating...`);
    url.searchParams.set('q', finalQ.substring(0, 100));
  }

  console.log(`[Pixabay API Request] URL: ${url.origin}${url.pathname}?key=HIDDEN&${url.searchParams.toString().replace(/key=[^&]+/, 'key=HIDDEN')}`);

  try {
    const response = await fetch(url.toString(), {
      // Кэширование ответа на 1 час
      next: { revalidate: 3600, tags: ['images'] }
    });

    if (response.status === 401 || response.status === 403) {
      console.error(`[Pixabay API Error] ${response.status}: Invalid API Key`);
      throw new Error('Неверный API ключ (401/403). Проверьте API_KEY в .env');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Pixabay API Error] ${response.status}: ${errorText}`);
      
      if (response.status === 400) {
        throw new Error('Некорректный запрос к API (400). Попробуйте сократить текст поиска или выбрать другую категорию.');
      }
      
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
