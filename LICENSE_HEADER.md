📄 LICENSE_HEADER.md

This document provides standard copyright and license headers for files in the NeoAfk project.

Using consistent headers helps preserve copyright notices, improve code attribution, and make licensing clear throughout the repository.

---

JavaScript (.js)

/*
 * NeoAfk
 * Copyright (c) 2026 NazCafe
 *
 * This file is part of NeoAfk.
 *
 * NeoAfk is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * NeoAfk is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NeoAfk. If not, see <https://www.gnu.org/licenses/>.
 */

---

TypeScript (.ts)

/*
 * NeoAfk
 * Copyright (c) 2026 NazCafe
 *
 * Licensed under the GNU GPL v3.0 or later.
 * See the LICENSE file in the project root for details.
 */

---

JSON (.json)

«JSON does not officially support comments.»

Do not place license headers inside JSON files such as:

- package.json
- package-lock.json
- tsconfig.json
- launch.json

Instead, rely on the repository-level LICENSE file.

---

Markdown (.md)

> **Copyright © 2026 NazCafe**
>
> This document is part of the NeoAfk project and is distributed under the GNU General Public License v3.0 (GPL-3.0). See the LICENSE file for details.

---

Shell Scripts (.sh)

#!/usr/bin/env bash

# NeoAfk
# Copyright (c) 2026 NazCafe
#
# Licensed under the GNU GPL v3.0 or later.
# See the LICENSE file for details.

---

YAML (.yml / .yaml)

# NeoAfk
# Copyright (c) 2026 NazCafe
#
# Licensed under the GNU GPL v3.0 or later.
# See the LICENSE file for details.

---

GitHub Workflow Files

Use the YAML header above for files inside:

- .github/workflows/

---

Images and Binary Files

Images, icons, logos, and other binary assets cannot contain embedded license headers.

Instead:

- Keep them within the NeoAfk repository.
- Reference the project LICENSE.
- Credit the original creator if third-party assets are used.

---

Third-Party Code

If NeoAfk includes third-party code or assets:

- Preserve the original license.
- Preserve copyright notices.
- Include attribution where required.
- Do not remove upstream license headers.

---

Copyright Notice

Unless otherwise noted:

Copyright (c) 2026 NazCafe

NeoAfk is licensed under the GNU General Public License version 3.0 (GPL-3.0) or any later version.

See the LICENSE file in the project root for the complete license text.

---

Questions

If you are unsure whether a file requires a license header, prefer keeping the repository LICENSE file as the primary source of licensing information and follow the conventions documented here.