(() => {
  const gate = document.getElementById('gate');
  if (!gate) {
    return;
  }

  const form = gate.querySelector('.gate-form');
  const input = gate.querySelector('input[name="password"]');
  const error = gate.querySelector('.gate-error');
  const HASH = '2a357e5984a0aa9210a46a3866d8bb57831f74893a6552554a72e5eeb3e41739';
  const KEY = 'site_unlock_state';
  const TTL_MS = 60 * 60 * 1000;

  const setLocked = (locked) => {
    document.body.classList.toggle('locked', locked);
    gate.classList.toggle('is-active', locked);
    gate.setAttribute('aria-hidden', locked ? 'false' : 'true');
  };

  const digest = async (value) => {
    const data = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const unlock = () => {
    const payload = { hash: HASH, ts: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(payload));
    setLocked(false);
  };

  const hasAccess = () => {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return false;
    }
    try {
      const data = JSON.parse(raw);
      const validHash = data && data.hash === HASH;
      const fresh = data && typeof data.ts === 'number' && (Date.now() - data.ts) < TTL_MS;
      return Boolean(validHash && fresh);
    } catch (err) {
      return false;
    }
  };

  if (hasAccess()) {
    setLocked(false);
    return;
  }

  setLocked(true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    error.textContent = '';

    if (!value) {
      error.textContent = '请输入密码。';
      return;
    }

    try {
      const hashed = await digest(value);
      if (hashed === HASH) {
        unlock();
        input.value = '';
      } else {
        error.textContent = '密码不正确，请重试。';
      }
    } catch (err) {
      error.textContent = '验证失败，请刷新页面重试。';
    }
  });
})();
