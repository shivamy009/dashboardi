import React from 'react';
import styles from './ArticleModal.module.scss';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  return (
    <div className={styles.modalOverlay} role="dialog" aria-labelledby="article-title">
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2 id="article-title">{article.title}</h2>
        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} className={styles.modalImage} />
        )}
        <p>{article.description}</p>
        <p>Source: {article.source.name}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Read full article
        </a>
      </div>
    </div>
  );
};