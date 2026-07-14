import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import Table from '../../components/common/Table';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import useFetch from '../../hooks/useFetch';
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import newsService from '../../services/newsService';
import { ROUTES, buildPath } from '../../routes/routeConfig';
import { formatDate } from '../../utils/formatDate';
import { CONTENT_STATUS } from '../../utils/constants';

/**
 * NewsList – paginated, searchable list of news articles.
 */
const NewsList = () => {
  const navigate = useNavigate();
  const [search, setSearch]         = useState('');
  const [deleteId, setDeleteId]     = useState(null);
  const [deleting, setDeleting]     = useState(false);
  const debouncedSearch             = useDebounce(search, 400);

  const { data, loading, error, refetch } = useFetch(
    () => newsService.getAll({ search: debouncedSearch }),
    [debouncedSearch]
  );

  const allNews = data?.items || data || [];

  const {
    paginatedData, currentPage, totalPages, totalItems,
    startItem, endItem, pageRange, goToPage, canNext, canPrev,
  } = usePagination(allNews);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await newsService.remove(deleteId);
      setDeleteId(null);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const statusBadge = (status) => {
    const map = {
      [CONTENT_STATUS.PUBLISHED]: 'badge-success',
      [CONTENT_STATUS.DRAFT]:     'badge-warning',
      [CONTENT_STATUS.ARCHIVED]:  'badge-gray',
    };
    return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
  };

  const columns = [
    { key: 'title',     header: 'Title',       render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'category',  header: 'Category',    render: (row) => row.category || '—' },
    { key: 'status',    header: 'Status',      render: (row) => statusBadge(row.status), width: 120 },
    { key: 'createdAt', header: 'Published',   render: (row) => formatDate(row.createdAt), width: 130 },
    {
      key: 'actions', header: '', width: 120,
      render: (row) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(buildPath(ROUTES.NEWS_EDIT, { id: row._id })); }}>Edit</Button>
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setDeleteId(row._id); }} style={{ color: 'var(--color-danger)' }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <PageHeader
        title="News"
        subtitle="Manage all news articles and announcements."
        breadcrumbs={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: 'News' }]}
        actions={
          <Button variant="primary" onClick={() => navigate(ROUTES.NEWS_CREATE)}>
            + New Article
          </Button>
        }
      />

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search articles…"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedData}
        loading={loading}
        rowKey="_id"
        onRowClick={(row) => navigate(buildPath(ROUTES.NEWS_VIEW, { id: row._id }))}
      />

      {/* Pagination */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
          pageRange={pageRange}
          onPageChange={goToPage}
          canNext={canNext}
          canPrev={canPrev}
        />
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
};

export default NewsList;
