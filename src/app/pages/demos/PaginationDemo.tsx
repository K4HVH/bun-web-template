import { createSignal } from 'solid-js';
import { Pagination } from '../../../components/navigation/Pagination';
import { Card, CardHeader } from '../../../components/surfaces/Card';

export default function PaginationDemo() {
  const [page1, setPage1] = createSignal(1);
  const [page2, setPage2] = createSignal(5);
  const [page3, setPage3] = createSignal(1);
  const [page4, setPage4] = createSignal(1);
  const [page5, setPage5] = createSignal(5);
  const [page6, setPage6] = createSignal(1);
  const [page7, setPage7] = createSignal(50);

  return (
    <>
      <h2>Pagination Component Examples</h2>

      {/* Basic Usage */}
      <Card>
        <CardHeader title="Basic Pagination" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Pagination page={page1()} totalPages={10} onPageChange={setPage1} />
          <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)' }}>
            Current page: {page1()}
          </p>
        </div>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader title="Variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Primary</h3>
            <Pagination page={page2()} totalPages={10} onPageChange={setPage2} variant="primary" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Secondary (default)</h3>
            <Pagination page={page2()} totalPages={10} onPageChange={setPage2} variant="secondary" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Subtle</h3>
            <Pagination page={page2()} totalPages={10} onPageChange={setPage2} variant="subtle" />
          </div>
        </div>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader title="Sizes" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Compact</h3>
            <Pagination page={page3()} totalPages={10} onPageChange={setPage3} size="compact" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Normal (default)</h3>
            <Pagination page={page3()} totalPages={10} onPageChange={setPage3} size="normal" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Spacious</h3>
            <Pagination page={page3()} totalPages={10} onPageChange={setPage3} size="spacious" />
          </div>
        </div>
      </Card>

      {/* Navigation Controls */}
      <Card>
        <CardHeader title="Navigation Controls" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Without First/Last Buttons
            </h3>
            <Pagination
              page={page4()}
              totalPages={10}
              onPageChange={setPage4}
              showFirstLast={false}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Only prev/next buttons shown
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Without Prev/Next Buttons
            </h3>
            <Pagination
              page={page4()}
              totalPages={10}
              onPageChange={setPage4}
              showPrevNext={false}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Only first/last buttons shown
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Page Numbers Only
            </h3>
            <Pagination
              page={page4()}
              totalPages={10}
              onPageChange={setPage4}
              showFirstLast={false}
              showPrevNext={false}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              No navigation buttons
            </p>
          </div>
        </div>
      </Card>

      {/* Custom Sibling Count */}
      <Card>
        <CardHeader title="Custom Sibling Count" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              siblingCount=0
            </h3>
            <Pagination
              page={page5()}
              totalPages={20}
              onPageChange={setPage5}
              siblingCount={0}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Shows current page only
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              siblingCount=1 (default)
            </h3>
            <Pagination
              page={page5()}
              totalPages={20}
              onPageChange={setPage5}
              siblingCount={1}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Shows current \u00b1 1 page
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              siblingCount=2
            </h3>
            <Pagination
              page={page5()}
              totalPages={20}
              onPageChange={setPage5}
              siblingCount={2}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Shows current \u00b1 2 pages
            </p>
          </div>
        </div>
      </Card>

      {/* Edge Cases */}
      <Card>
        <CardHeader title="Edge Cases" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Single Page
            </h3>
            <Pagination page={1} totalPages={1} onPageChange={() => {}} />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Few Pages (no ellipsis)
            </h3>
            <Pagination page={page6()} totalPages={5} onPageChange={setPage6} />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Disabled
            </h3>
            <Pagination page={3} totalPages={10} onPageChange={() => {}} disabled />
          </div>
        </div>
      </Card>

      {/* Large Page Count */}
      <Card>
        <CardHeader title="Large Page Count" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Pagination page={page7()} totalPages={100} onPageChange={setPage7} />
          <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)' }}>
            Current page: {page7()} - Ellipsis handles large ranges efficiently
          </p>
        </div>
      </Card>
    </>
  );
}
