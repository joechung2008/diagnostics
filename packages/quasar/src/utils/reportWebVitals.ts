import type { MetricType } from 'web-vitals';

type ReportHandler = (metric: MetricType) => void;

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry instanceof Function) {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
