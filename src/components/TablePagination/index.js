import { useEffect, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import PropTypes from 'prop-types';

import { PaginationButton, PaginationContainer } from './styles';

export function TablePagination({ list, setSelectedList, itemsPerPage }) {
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    if (list) {
      const allPages = Math.ceil(list.length / itemsPerPage);

      const pages = [];

      if (allPages === 0) {
        pages.push(1);
      } else {
        for (let index = 1; index <= allPages; index += 1) {
          pages.push(index);
        }
      }

      setNumberOfPages(pages);
    } else {
      setSelectedList([]);
      setNumberOfPages([]);
    }
  }, [list, setSelectedList, itemsPerPage]);

  useEffect(() => {
    const currentList = list.filter(
      (_, index) =>
        index >= itemsPerPage * (selectedPage - 1) &&
        index < selectedPage * itemsPerPage
    );

    setSelectedList(currentList);
  }, [selectedPage, itemsPerPage, list, setSelectedList]);

  return (
    <PaginationContainer>
      <PaginationButton
        type="button"
        aria-label="Botão pagina anterior"
        onClick={() => {
          setSelectedPage(selectedPage - 1);
        }}
        disabled={selectedPage === numberOfPages[0] && numberOfPages.length > 0}
      >
        <FontIcon
          aria-label="Ícone do botão pagina anterior"
          iconName="ChromeBack"
        />
      </PaginationButton>

      {numberOfPages.map((page) => (
        <PaginationButton
          type="button"
          aria-label={`Botão página ${page}`}
          key={`page-${page}`}
          onClick={() => {
            setSelectedPage(page);
          }}
          disabled={selectedPage === page}
          bordered
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        type="button"
        aria-label="Botão proxíma página"
        onClick={() => {
          setSelectedPage(selectedPage + 1);
        }}
        disabled={
          selectedPage === numberOfPages[numberOfPages.length - 1] &&
          numberOfPages.length > 0
        }
      >
        <FontIcon
          aria-label="Ícone do botão proxíma página"
          iconName="ChromeBackMirrored"
        />
      </PaginationButton>
    </PaginationContainer>
  );
}

TablePagination.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSelectedList: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
