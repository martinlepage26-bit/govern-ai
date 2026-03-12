const STORAGE_PREFIX = 'govern-ai-module-connection';

const DEFAULTS = {
  compassai: {
    baseUrl: process.env.REACT_APP_COMPASSAI_URL || 'http://127.0.0.1:9205',
    token: process.env.REACT_APP_COMPASSAI_TOKEN || ''
  },
  aurorai: {
    baseUrl: process.env.REACT_APP_AURORAI_URL || 'http://127.0.0.1:9206',
    token: process.env.REACT_APP_AURORAI_TOKEN || ''
  }
};

const emptyConfig = (moduleKey) => ({
  baseUrl: DEFAULTS[moduleKey]?.baseUrl || '',
  token: DEFAULTS[moduleKey]?.token || ''
});

export const getModuleConfig = (moduleKey) => {
  const defaults = emptyConfig(moduleKey);

  if (typeof window === 'undefined') {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}:${moduleKey}`);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      baseUrl: parsed.baseUrl || defaults.baseUrl,
      token: parsed.token || defaults.token
    };
  } catch (error) {
    return defaults;
  }
};

export const saveModuleConfig = (moduleKey, config) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    `${STORAGE_PREFIX}:${moduleKey}`,
    JSON.stringify({
      baseUrl: (config.baseUrl || '').trim(),
      token: (config.token || '').trim()
    })
  );
};

export const clearModuleConfig = (moduleKey) => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(`${STORAGE_PREFIX}:${moduleKey}`);
};

const buildHeaders = ({ token, headers = {}, hasJsonBody }) => {
  const nextHeaders = { ...headers };

  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`;
  }

  if (hasJsonBody && !nextHeaders['Content-Type']) {
    nextHeaders['Content-Type'] = 'application/json';
  }

  return nextHeaders;
};

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
};

export const requestModuleJson = async ({
  baseUrl,
  path,
  token = '',
  method = 'GET',
  body,
  formData,
  headers
}) => {
  const hasJsonBody = body !== undefined && !formData;
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: formData ? buildHeaders({ token, headers, hasJsonBody: false }) : buildHeaders({ token, headers, hasJsonBody }),
    body: formData || (hasJsonBody ? JSON.stringify(body) : undefined)
  });

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const detail = typeof payload === 'string'
      ? payload
      : payload?.detail?.message || payload?.detail || payload?.message || response.statusText;
    const error = new Error(detail || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const formatDateTime = (value) => {
  if (!value) return 'Not available';

  const date = typeof value === 'string' || typeof value === 'number'
    ? new Date(value)
    : value;

  if (Number.isNaN(date?.getTime?.())) return 'Not available';

  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

export const normalizeList = (payload, key) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.[key])) return payload[key];
  return [];
};
