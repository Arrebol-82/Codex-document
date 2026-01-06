export const docsData = [
  {
    id: "overview",
    title: "OpenAI Codex 常见问题概览",
    description: "一眼看懂：这份 FAQ 帮你用最短路径排查 Codex 的常见坑。",
    category: "概览",
    sections: [
      {
        heading: "FAQ 简介",
        content: `
想快速知道问题出在哪、怎么修？按目录找对应场景，照着“常见原因→立刻检查→不行再试”去做。
覆盖：账号/权限、登录与工作区、CLI、VSCode 插件、Web/API、网络与环境。
`,
      },
    ],
  },
  {
    id: "account-permission",
    title: "账号与权限相关问题",
    description: "确认订阅/组织/模型权限，排除“账号不支持”“升级到 Plus”类提示。",
    category: "账号与权限",
    sections: [
      {
        heading: "Q1: 没有 Codex 使用权限或收到 “账号不支持 Codex” 提示怎么办？",
        content: `
症状：提示“账号不支持 Codex”“model not exist or you do not have access”等。
常见原因：
- 用的是免费账号，或没加入有 Codex 权限的团队/组织。
- API Key/目标模型不在你的权限里。
- 升级或被邀请后还没刷新登录。
快速排查：
1) 在 ChatGPT 右上角看订阅：必须 Plus/Pro/Team/Edu/Enterprise 及以上。
2) 运行 codex /model 或在模型列表里确认能否看到目标模型，若没有说明无权限。
3) 确认已加入正确组织/工作区，重新登录（VSCode 也重启后 Sign In）。
还不行：
- 换用有权限的账号或团队的 API Key。
- 截图错误信息 + 订阅/组织情况给支持。
`,
      },
      {
        heading: "Q2: 注册 OpenAI 账户、接受 Codex 邀请或加入团队时遇到错误或限制？",
        content: `
症状：注册/点击邀请/加入组织失败。
常见原因：
- 所在地区不在支持范围。
- 邀请链接过期或已被用过。
- 账号已经在别的组织，或压根没有组织。
- 手机/邮箱验证不过。
快速排查：
1) 查官方支持国家列表，若不支持只能换到受支持网络再注册/登录。
2) 让邀请方重新发送有效链接。
3) 在控制台确认组织状态；如在其他组织先退出，再接受新邀请。
4) 确保使用受支持的手机号/邮箱完成验证。
还不行：附错误截图、地区、账号邮箱提交给支持处理。
`,
      },
      {
        heading: "Q28: VSCode 使用 Codex 时提示 “Failed – To use Codex with your ChatGPT plan, upgrade to Plus” 怎么办？",
        content: `
症状：VSCode 弹窗要求升级到 Plus。
常见原因：账号是 Free，或插件登录了错误账号/识别异常。
快速排查：
1) 浏览器打开 chatgpt.com 查看订阅标签是否 Plus/Pro/Team。
2) 如果是 Free，就先升级；升级后在 VSCode 退出 Codex 账号并重登。
3) 已经付费却提示升级：全部 Sign Out（VSCode 和浏览器），用付费账号重新授权；或直接在设置填入付费组织的 API Key。
4) 仍提示时，重启 VSCode 再试。
求助时：附报错截图、订阅截图、VSCode/Codex 插件版本。
`,
      },
    ],
  },
  {
    id: "login-workspace",
    title: "登录与工作区问题",
    description: "解决登录循环、SSO/工作区卡住、回调端口/缓存等登录相关问题。",
    category: "登录与工作区",
    sections: [
      {
        heading: "Q3: 登录 Codex CLI 或 VSCode 插件时，总是反复要求登录（陷入登录循环）怎么办？",
        content: `
症状：授权后又被要求登录。
常见原因：旧令牌/缓存未清、浏览器用错账号、插件 bug、网络/代理阻断。
快速排查：
1) 全部登出：VSCode 账户面板退出 Codex/OpenAI；CLI 跑 codex logout（如可用）。
2) VSCode 命令面板执行 Developer: Open Authentication Storage，把 OpenAI/Codex 相关记录全删。
3) 无痕窗口重新登录，用有权限的账号授权；完成后回 VSCode 看是否已登录。
4) 不想走网页的，直接在 VSCode 设置或环境变量里填 OPENAI_API_KEY。
5) 仍循环：看 VSCode 输出/开发者工具日志，确认是否有错误或在等你的确认。
`,
      },
      {
        heading: "Q4: 使用单点登录 (SSO) 或在选择工作区后，Codex 无法成功登录，该怎么办？",
        content: `
症状：SSO/选工作区后卡住或无反应。
常见原因：SSO 兼容问题、选错工作区、WSL 回调失败、端口/防火墙拦截。
快速排查：
1) 若可行，改用邮箱+密码登录，绕开 SSO。
2) 授权时务必选择有 Codex 权限的工作区；多组织时选对那一个。
3) WSL 场景：先在 Windows 下登录，让 %USERPROFILE%\\.codex 生成凭证，再拷到 WSL 的 ~/.codex 复用。
4) 确保代理/防火墙允许本地回调，端口未被占（重启或更换占用程序后再试）。
5) 记录卡在哪一步、错误码，方便求助。
`,
      },
      {
        heading: "Q29: Unable to persist auth file: 当文件已存在时，无法创建该文件。(os error 183)",
        content: `
症状：登录写 auth.json 时报 os error 183。
常见原因：用户目录下 .codex 被同名文件/坏目录占用，或写权限被拦。
快速排查：
1) 在用户目录确认 .codex 是文件夹，不是同名文件。
2) 备份改名旧 .codex -> .codex.bak，新建空的 .codex 目录。
3) 重登，让 Codex 自动生成 auth.json；若仍报错，检查权限/杀毒软件。
求助时：带错误截图和 .codex 结构。
`,
      },
      {
        heading: "Q30: 使用 codex 选择 “Sign in with ChatGPT” 登录时，浏览器跳转到 http://localhost:1455/auth/callback 提示 ERR_CONNECTION_REFUSED",
        content: `
症状：回调地址 1455 连接被拒绝。
常见原因：1455 没监听（端口被排除/占用）、浏览器和 codex 不在同一机、被防火墙拦。
快速排查：
1) 确认 codex 与浏览器在同一台本机（不要跨远程/WSL 未转发）。
2) 本机管理员 CMD 查看排除端口：netsh interface ipv4 show excludedportrange protocol=tcp；如覆盖 1455，重启 winnat/hns/Hyper-V 后再查，确保 1455 可用。
3) 远程/WSL 场景用 ssh -L 1455:localhost:1455 做端口转发，再用回调链接。
4) 关闭防火墙或占用 1455 的程序后重试；若终端提示 bind 失败，换个可用端口。
求助时：附终端错误和浏览器截图。
`,
      },
      {
        heading: "Q31: ChatGPT / Codex 登录或使用过程中提示 “Invalid session. Please start over.”",
        content: `
症状：弹 “Invalid session/Please start over”。
常见原因：会话过期、Cookie 异常、频繁切账号/网络。
快速排查：
1) 刷新或关闭当前授权页，重新从 codex login 开始。
2) 用无痕窗口访问 https://chatgpt.com 重新登录，再回 Codex 授权。
3) 仅清理 openai.com/chatgpt.com/auth.openai.com 的站点数据后重登。
4) 登录过程尽量别切网络/VPN，必要时换浏览器/设备测试。
5) 反复失败就等几分钟再试，仍不行附截图+环境提交支持。
`,
      },
    ],
  },
  {
    id: "cli-issues",
    title: "Codex CLI 工具常见问题",
    description: "写权限、审批、依赖、卡顿相关的 CLI 快速自检步骤。",
    category: "CLI 工具",
    sections: [
      {
        heading: "Q5: 为什么 Codex CLI 无法编辑项目文件，总是提示权限不足或不执行修改？",
        content: `
症状：CLI 说没权限或不改文件。
常见原因：沙盒是只读、审批模式在等确认、路径不在可写范围、账号未登录/订阅不足。
快速排查：
1) 运行 codex /status 看 sandbox/approval/subscription。
2) 重启命令：codex --sandbox workspace-write --ask-for-approval on-request（或在 config 里设为默认 workspace-write）。
3) 确认当前目录就是项目且可写（ls/pwd 检查）。
4) 若在等确认，按提示确认或把 approval-mode 改成 auto/never。
5) 用有权限的账号登录再试。
`,
      },
      {
        heading: "Q6: 已经使用 workspace-write 模式启动，但 Codex CLI 对文件的修改仍然不生效？",
        content: `
症状：显示已执行，文件没改。
常见原因：没登录或仍是 Free、当前目录不对/只读、配置被旧 .codex 覆盖、CLI 在等你确认。
快速排查：
1) codex /status 确认 Authentication=OK 且订阅不是 Free。
2) 用 pwd/ls 确认在目标项目；让 Codex 先创建 test.txt 验证写入。
3) 备份并移除 ~/.codex/config.toml 或项目 .codex.toml，重新以 workspace-write 启动并登录。
4) 观察终端是否提示等待批准或有错误；必要时加 --debug。
`,
      },
      {
        heading: "Q7: 我已将审批模式设为 “never” (从不确认)，为什么 Codex CLI 仍然会弹出确认提示？",
        content: `
症状：设置 never 仍弹确认。
常见原因：其他层级覆盖（项目配置/环境变量/启动参数），或操作被视为高危。
快速排查：
1) 查看 codex config get approval-mode、项目 .codex.toml、环境变量 CODEX_APPROVAL_MODE、启动命令是否带 --ask-for-approval。
2) 统一改成 never：命令行显式带 --ask-for-approval never，或清掉冲突配置后 codex config set approval-mode never。
3) 记住删除大量文件、改系统配置等高危操作无论如何都会再确认，这是预期。
`,
      },
      {
        heading: "Q8: Codex CLI 启动时出现错误 “MCP client for chrome-devtools failed to start: program not found” 怎么办？",
        content: `
症状：启动提示找不到 chrome-devtools 程序。
常见原因：没装 Chrome/路径未告知、缺少 chrome-devtools-mcp 包。
快速排查：
1) 安装 Chrome，找出可执行路径。
2) 设置环境变量 PUPPETEER_EXECUTABLE_PATH 指向 Chrome 可执行。
3) 安装 MCP 客户端：npm install -g chrome-devtools-mcp（或 npx -y chrome-devtools-mcp@latest）。
4) 重启 Codex，codex mcp list 应显示 chrome-devtools 已连接。
`,
      },
      {
        heading: "Q9: 启动 Codex CLI 时出现 “Unsupported Auth” 警告，需要处理吗？",
        content: `
症状：控制台警告 Unsupported Auth。
说明：多半只是提示某个 MCP 不需要鉴权，功能正常可直接忽略。
处理：若有功能异常，更新 Codex CLI 后再试；仍有问题再带日志反馈。
`,
      },
      {
        heading: "Q10: Codex CLI 执行命令时没有响应，任务卡住或长时间无结果怎么办？",
        content: `
症状：CLI 卡住无输出。
常见原因：网络不通/被代理挡、任务本身耗时、配额/速率限制、在等你确认、偶发 bug。
快速排查：
1) 先跑 codex "打个招呼" 验证网络是否通。
2) 加 --debug 看卡在哪一步。
3) 长任务给点时间，观察 CPU/网络是否仍在跑。
4) 检查 OpenAI Billing/Usage 是否配额或速率超限。
5) 确认没有隐藏的审批提示。
6) 仍卡就重启/更新 CLI，并把 debug 日志和命令场景发给支持。
`,
      },
    ],
  },
  {
    id: "vscode-plugin",
    title: "VSCode 插件使用 Codex 常见问题",
    description: "VSCode 登录、审批、模式、安全、网络、性能、任务创建等快捷排查。",
    category: "VSCode 插件",
    sections: [
      {
        heading: "Q11: VSCode 中 Codex 扩展反复要求登录，每次授权后仍跳回登录界面，怎么办？",
        content: `
症状：VSCode 反复要求登录。
常见原因：旧凭证没清、登录了无权限账号、插件版本/网络问题。
快速排查：
1) 在 VSCode 账户面板退出所有 Codex/OpenAI 账号。
2) 命令 Developer: Open Authentication Storage，删除相关记录。
3) 用无痕浏览器换成有权限的账号重新授权。
4) 或在设置里直接填 API Key（付费组织的密钥）。
5) 更新插件版本；看输出/开发者工具里是否有报错。
`,
      },
      {
        heading: "Q12: VSCode Codex 插件提示 “Account not supported”，无法使用我的免费账号，这是怎么回事？",
        content: `
症状：提示 Account not supported。
常见原因：使用了 Free 账号或选了没权限的组织。
解决：
1) 确认账户为 Plus/Pro/Team/Edu/Enterprise，否则先升级。
2) 登录时选择正确的有权限组织，或直接用该组织的 API Key。
3) 升级或切组织后重启 VSCode 再登录。
4) 仍误判就提交插件版本+订阅截图反馈。
`,
      },
      {
        heading: "Q13: 在 VSCode 中使用 Codex 时，每次让 AI 修改代码都弹出确认对话框，如何避免频繁的批准操作？",
        content: `
症状：每次改代码都要手动批准。
常见原因：处于 Chat 模式或默认审批是手动。
解决：
1) 在 Codex 面板切到 Agent/Full Access/自动模式（名称随版本可能不同）。
2) 在插件设置或 ~/.codex/config.toml 把默认审批改为 auto/always allow。
3) 重载 VSCode 确认设置生效。
4) 仍频繁弹窗：带设置截图和版本反馈。
`,
      },
      {
        heading: "Q14: Codex VSCode 插件的 Agent 模式（Full Access）太危险，AI 会不经确认执行改动，怎么办？",
        content: `
症状：Full Access 下 AI 直接改动让人不放心。
应对：
1) 切回 Auto 或 Read-Only 模式，让大改动需要确认。
2) 在 Codex 配置中为高危命令/文件启用强制确认，或限制沙盒只覆盖 workspace。
3) 用 Git 随时检查 Codex 改动，必要时回滚。
4) 若出现危险行为，记录细节反馈官方。
`,
      },
      {
        heading: "Q15: 在 Windows 系统上使用 Codex 时，发现 Codex 无法运行某些命令或不执行操作，这是什么原因？",
        content: `
症状：Windows 下命令/改动经常失效。
常见原因：原生支持有限、缺少 WSL、工具路径差异。
快速排查：
1) 优先在 WSL2 + VSCode Remote 中使用 Codex（兼容性最佳）。
2) 确认 Node/Git 等依赖在当前环境可用（node -v 等）。
3) 纯 PowerShell 场景，提示里要求使用 PowerShell 语法，或手动把 Linux 命令换成等效命令。
4) 查看 Codex 输出中的提示，如实验性支持信息，必要时改用 WSL。
`,
      },
      {
        heading: "Q16: VSCode 中 Codex 扩展报 “Network request failed” 或出现 SSL 证书错误，如何解决网络连接问题？",
        content: `
症状：Network request failed / SSL 错误。
常见原因：代理/防火墙拦截、代理证书未信任、VSCode 未配置代理。
快速排查：
1) 在 settings.json 配置 http.proxy（需要认证则配置 http.proxyAuthorization）。
2) 让 IT 白名单 openai.com/chatgpt.com/api.openai.com 并允许 WebSocket。
3) 代理重签证书需导入信任；万不得已可设 http.proxyStrictSSL=false（有风险）。
4) 配置后在 VSCode 终端用 curl https://api.openai.com/v1/models 测试。
5) 仍失败：附错误文案/代理类型给支持或网络团队。
`,
      },
      {
        heading: "Q17: VSCode 中 Codex 扩展运行缓慢，有时感觉无响应，该如何改进性能？",
        content: `
症状：Codex 在 VSCode 里很慢/无响应。
常见原因：用了云模式、VSCode 资源紧张、版本 bug、任务本身很重。
快速排查：
1) 小任务切到本地/Local 模式，减少往返。
2) 更新到最新稳定版，或回退到已知稳定版本再试。
3) 暂时禁用耗资源的其他扩展/窗口，释放 CPU/内存。
4) 控制请求频率，长任务耐心等候；多请求可合并处理。
5) 长期卡顿：在开发者工具里抓警告/错误并附示例反馈。
`,
      },
      {
        heading: "Q18: Codex 扩展无法创建新任务或跟进 (“Failed to create task” 错误)，应该如何处理？",
        content: `
症状：创建/跟进任务报 Failed to create task。
常见原因：服务端故障、任务频率限制、项目环境缺失（空仓库等）、浏览器兼容问题。
快速排查：
1) 看 OpenAI 状态页/社区是否在故障，是则等恢复。
2) 暂停片刻再试，避免短时间连发多任务。
3) 确保项目有内容并已 init Git，插件环境指向正确仓库。
4) Web 端换 Chrome/Firefox，关闭拦截类扩展。
5) 重新登录或重装 Codex 插件。
6) 仍失败：提供输出/控制台的错误码和时间点求助。
`,
      },
    ],
  },
  {
    id: "web-api",
    title: "Codex Web 及 API 使用问题",
    description: "Web 集成与 API 常见错误的简明排查。",
    category: "Web 与 API",
    sections: [
      {
        heading: "Q19: 在 Codex 的 Web 界面（如 ChatGPT 的 Codex 集成）中无法创建任务，每次都提示 “Failed to create task”，怎么办？",
        content: `
症状：Web 上创建任务失败。
常见原因：后端服务异常、浏览器不兼容、账号无权限、仓库内容不足。
快速排查：
1) 查 OpenAI 状态页/社区是否普遍故障，故障就等待。
2) 换 Chrome/Firefox，并关掉广告拦截/隐私扩展。
3) 确认账号有 Codex 权限，重新登录后再试。
4) 绑定的仓库要有 README/代码，不要是空仓库。
5) 按 F12 看 Console/Network 报错，截图连同时间反馈。
`,
      },
      {
        heading: "Q20: 调用 OpenAI Codex API 时收到错误：“必须是组织成员才能使用 API”，如何解决？",
        content: `
症状：API 返回 “must be a member of an organization to use the API”。
常见原因：账号没组织或没接受邀请，或用错了组织的 API Key。
快速排查：
1) 在控制台确认自己隶属于某个组织；若没有，联系支持绑定或接受团队邀请。
2) 使用正确组织的 API Key，必要时在请求头加 OpenAI-Organization。
3) 切换后重新调用测试。
求助时：提供组织 ID、错误时间、所用 Key 所属组织。
`,
      },
      {
        heading: "Q21: OpenAI Codex API 返回 403 错误，提示地区不支持（Country/Region not supported），怎么办？",
        content: `
症状：403 提示地区不支持。
常见原因：IP/账号处于受限地区，或 VPN 节点落在受限地区。
快速排查：
1) 确认官方支持地区列表，若确实不支持，只能换到受支持的网络。
2) 调整 VPN/代理节点到支持地区；若本地网络本就支持，确保出口 IP 没被误判。
3) 企业若需例外联系官方；个人基本只能等政策变。
4) 认为被误判时，提供邮箱+出口 IP 给支持调查。
`,
      },
      {
        heading: "Q22: 调用 Codex API 时遇到 429 错误，说请求速率过快或已超出配额，应该怎么办？",
        content: `
症状：429 速率/配额超限。
快速排查：
1) 看返回 message 判断是速率还是配额问题。
2) 实施退避重试，降低请求频率/并发。
3) 在 Billing/Usage 查看额度，必要时提升限额或购买额外额度。
4) 合并重复请求，减少并发。
5) 仍频繁触发：附完整错误响应、调用频率给支持。
`,
      },
      {
        heading: "Q23: 使用 Codex API 时返回 500 或 503 错误，如何应对服务器错误？",
        content: `
症状：500/503 服务端错误。
快速排查：
1) 先重试 1-2 次。
2) 查 OpenAI 状态页是否有 incident；503 多为服务繁忙。
3) 对 503 采用逐步退避后再重试，避免频繁轰炸。
4) 若某个请求必崩，简化/拆分输入再试。
5) 记录请求时间和（如有）请求 ID，反馈给支持。
`,
      },
    ],
  },
  {
    id: "network-environment",
    title: "网络和环境相关问题",
    description: "代理、防火墙、地区限制、依赖/环境检查的简明指南。",
    category: "网络与环境",
    sections: [
      {
        heading: "Q24: 使用公司代理或防火墙后，Codex 无法连接网络或出现异常，该如何配置网络？",
        content: `
症状：公司网络下连不上 Codex。
常见原因：未配代理、防火墙拦、代理需认证或证书未信任。
快速排查：
1) 配置代理：CLI 用 http_proxy/https_proxy 环境变量；VSCode 在 settings.json 设置 http.proxy（必要时 http.proxyAuthorization）。
2) 让 IT 白名单 api.openai.com/chatgpt.com 等域名，并放行 WebSocket。
3) 代理重签证书需导入信任；不行再考虑关闭严格 SSL（有风险）。
4) 配置后用 curl 访问 https://api.openai.com/v1/models 测试是否通。
5) 仍失败：把错误信息和代理地址（脱敏）发给网络/支持团队。
`,
      },
      {
        heading: "Q25: 中国大陆用户无法直接访问 Codex，有什么解决方法或注意事项？",
        content: `
症状：中国大陆直连失败或被限制。
常见原因：GFW 阻断 + 官方政策限制。
解决思路：
1) 在合法合规前提下使用稳定的境外 VPN/代理节点访问。
2) 或选用境外第三方 API 代理（注意数据安全和条款风险）。
3) 仍需有效的海外 OpenAI 账号/订阅，否则也无法使用。
4) 风险自担，不要泄露账号/密钥。
`,
      },
      {
        heading: "Q26: 使用 Codex CLI/插件对环境有何要求？Node.js、Chrome 这些需要准备吗，不满足会出现哪些错误？",
        content: `
症状：安装/运行时报找不到 node/npx/uv/Chrome 或提示版本过旧。
快速排查：
1) 安装最新 LTS Node.js（18/20），用 node -v 和 npx --version 验证。
2) 日志提到 uv/uvx 缺失且需要相关功能时，pip install uv uvx（可选）。
3) 用到 Chrome DevTools 功能时，需安装 Chrome 并配置 PUPPETEER_EXECUTABLE_PATH。
4) 确保 Git 等基础工具在环境中可用。
5) 更新 VSCode 到较新版本再装 Codex 插件。
6) 看到 “command not found” 之类按提示补齐依赖。
`,
      },
      {
        heading: "Q27: 还有其他环境因素会导致 Codex 异常吗？比如时间同步或端口占用等",
        content: `
症状：莫名失败/登录异常/回调不通。
常见原因：系统时间不准、回调端口被占、杀毒/防火墙拦截、资源耗尽。
快速排查：
1) 校准系统时间和时区，保持自动同步。
2) 检查回调端口（如 8000/1455 等）是否被占，必要时 netstat/lsof 或重启释放。
3) 将 Codex/VSCode 加入杀毒、防火墙白名单。
4) 监控 CPU/内存，资源紧张先关闭其他程序。
5) 依旧异常：备份后清理 ~/.codex 重装，再带日志+近期系统变更信息求助。
`,
      },
    ],
  },
  {
    id: "conclusion",
    title: "结尾与求助建议",
    description: "问题没解开时，准备好关键信息去求助。",
    category: "附录",
    sections: [
      {
        heading: "后续建议",
        content: `
按上面排查仍搞不定：收集报错截图、执行命令、日志时间点，以及账户/订阅/环境信息，提交给 OpenAI 支持或开发者社区。保持代码在版本控制下，必要时回滚。祝使用顺利！
`,
      },
    ],
  },
];
