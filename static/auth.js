(() => {
  const gate = document.getElementById('gate');
  if (!gate) {
    return;
  }

  const form = gate.querySelector('.gate-form');
  const input = gate.querySelector('input[name="password"]');
  const error = gate.querySelector('.gate-error');
  const HASH = '2a357e5984a0aa9210a46a3866d8bb57831f74893a6552554a72e5eeb3e41739';
  const KEY = 'site_unlock_hash';

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
    localStorage.setItem(KEY, HASH);
    setLocked(false);
  };

  const hasAccess = () => localStorage.getItem(KEY) === HASH;

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
