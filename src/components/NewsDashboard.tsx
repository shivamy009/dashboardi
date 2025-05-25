import React, { useState } from 'react';
import { useGetNewsQuery } from '../services/newsApi';
import { ArticleModal } from './ArticleModal';
import styles from './NewsDashboard.module.scss';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

export const NewsDashboard: React.FC = () => {
  const [category, setCategory] = useState<string>('technology');
  const [page, setPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data, error, isLoading } = useGetNewsQuery({ category, page });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className={styles.newsDashboard} aria-label="News Dashboard">
      <div className={styles.filterContainer}>
        <label htmlFor="category-select" className="sr-only">Select news category</label>
        <select
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          className={styles.categorySelect}
        >
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      {isLoading && <div className={styles.loader} aria-live="polite">Loading...</div>}
      {error && (
        <div className={styles.error} role="alert">
          Error fetching news. Please try again.
        </div>
      )}
      {data?.articles && (
        <div className={styles.newsGrid}>
          {data.articles.map((article: Article, index: number) => (
            <div
              key={index}
              className={styles.newsCard}
              onClick={() => setSelectedArticle(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedArticle(article)}
            >
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className={styles.newsImage} />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p className={styles.source}>{article.source.name}</p>
            </div>
          ))}
        </div>
      )}
      {data?.articles && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={styles.pageButton}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className={styles.pageButton}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </section>
  );
};