import { Component, createSignal, onCleanup } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Progress } from '../../../components/feedback/Progress';
import { Button } from '../../../components/inputs/Button';

const ProgressDemo: Component = () => {
  const [linearProgress, setLinearProgress] = createSignal(0);
  const [circularProgress, setCircularProgress] = createSignal(0);
  const [uploadProgress, setUploadProgress] = createSignal(0);

  // Auto-increment linear progress
  const linearInterval = setInterval(() => {
    setLinearProgress((prev) => (prev >= 100 ? 0 : prev + 1));
  }, 100);

  // Auto-increment circular progress
  const circularInterval = setInterval(() => {
    setCircularProgress((prev) => (prev >= 100 ? 0 : prev + 2));
  }, 100);

  onCleanup(() => {
    clearInterval(linearInterval);
    clearInterval(circularInterval);
  });

  // Simulate file upload
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <>
      <h2>Progress Component Examples</h2>

      <Card>
        <CardHeader title="Linear Progress - Determinate" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing)' }}>
          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Auto-incrementing: {linearProgress()}%
            </p>
            <Progress type="linear" value={linearProgress()} />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              With label:
            </p>
            <Progress type="linear" value={linearProgress()} showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Custom label:
            </p>
            <Progress type="linear" value={linearProgress()} label={`${linearProgress()} of 100 items`} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Linear Progress - Sizes" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing)' }}>
          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Small
            </p>
            <Progress type="linear" value={65} size="sm" showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Normal (default)
            </p>
            <Progress type="linear" value={65} size="normal" showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-lg)' }}>
              Large
            </p>
            <Progress type="linear" value={65} size="lg" showLabel />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Linear Progress - Variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing)' }}>
          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Primary (default)
            </p>
            <Progress type="linear" value={75} variant="primary" showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Success
            </p>
            <Progress type="linear" value={100} variant="success" showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Warning
            </p>
            <Progress type="linear" value={60} variant="warning" showLabel />
          </div>

          <div>
            <p style={{ 'margin-bottom': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Error
            </p>
            <Progress type="linear" value={25} variant="error" showLabel />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Linear Progress - Indeterminate (Loading)" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing)' }}>
          <p style={{ color: 'var(--g-text-secondary)' }}>
            When no value is provided, shows an animated loading state:
          </p>
          <Progress type="linear" />
          <Progress type="linear" variant="success" />
          <Progress type="linear" variant="warning" />
          <Progress type="linear" variant="error" />
        </div>
      </Card>

      <Card>
        <CardHeader title="Circular Progress - Determinate" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing-lg)', 'flex-wrap': 'wrap', 'align-items': 'center' }}>
          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={circularProgress()} size="lg" showLabel />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              With label
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={25} size="lg" variant="primary" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              25%
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={50} size="lg" variant="success" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              50%
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={75} size="lg" variant="warning" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              75%
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={100} size="lg" variant="error" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              100%
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Circular Progress - Sizes" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing-lg)', 'align-items': 'center' }}>
          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={75} size="sm" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-xs)' }}>
              Small
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={75} size="normal" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Normal
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" value={75} size="lg" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Large
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Circular Progress - Indeterminate (Spinner Replacement)" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing-lg)', 'align-items': 'center' }}>
          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" size="sm" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-xs)' }}>
              Small
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" size="normal" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Normal
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" size="lg" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)' }}>
              Large
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" variant="success" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Success
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" variant="warning" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Warning
            </p>
          </div>

          <div style={{ 'text-align': 'center' }}>
            <Progress type="circular" variant="error" />
            <p style={{ 'margin-top': 'var(--g-spacing-sm)', color: 'var(--g-text-secondary)', 'font-size': 'var(--font-size-sm)' }}>
              Error
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Real-World Example - File Upload" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing)' }}>
          <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'align-items': 'center' }}>
            <Button onClick={simulateUpload} disabled={uploadProgress() > 0 && uploadProgress() < 100}>
              {uploadProgress() === 100 ? 'Upload Complete!' : uploadProgress() > 0 ? 'Uploading...' : 'Start Upload'}
            </Button>
            {uploadProgress() > 0 && uploadProgress() < 100 && (
              <Progress type="circular" value={uploadProgress()} size="normal" variant="primary" />
            )}
            {uploadProgress() === 100 && (
              <Progress type="circular" value={100} size="normal" variant="success" />
            )}
          </div>

          {uploadProgress() > 0 && (
            <Progress
              type="linear"
              value={uploadProgress()}
              variant={uploadProgress() === 100 ? 'success' : 'primary'}
              label={uploadProgress() === 100 ? 'Upload complete!' : `Uploading... ${uploadProgress()}%`}
            />
          )}
        </div>
      </Card>

      <Card>
        <CardHeader title="Button Integration" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'flex-wrap': 'wrap' }}>
          <Button loading>Loading Button</Button>
          <Button loading variant="secondary">
            Secondary Loading
          </Button>
          <Button loading variant="danger">
            Danger Loading
          </Button>
          <Button loading size="compact">
            Compact
          </Button>
          <Button loading size="spacious">
            Spacious Loading
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProgressDemo;
