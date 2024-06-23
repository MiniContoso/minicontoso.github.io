import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,b as e}from"./app-DHNsKz1s.js";const t={},o=e(`<h2 id="前提准备" tabindex="-1"><a class="header-anchor" href="#前提准备"><span>前提准备</span></a></h2><p>操作系统</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token punctuation">(</span><span class="token function">Get-CimInstance</span> <span class="token operator">-</span>ClassName Win32_OperatingSystem<span class="token punctuation">)</span><span class="token punctuation">.</span>Caption
Microsoft Windows Server 2022 Standard Evaluation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>系统命名</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Rename-Computer</span> <span class="token operator">-</span>NewName DHCP02 <span class="token operator">-</span>Restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>IP地址</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>IP地址：10.10.10.22
子网掩码：255.255.255.0
默认网关：10.10.10.1
DNS服务器（首选）：10.10.10.10
DNS服务器（备选）：10.10.10.11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加域</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Add-Computer</span> <span class="token operator">-</span>DomainName minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>Credential minicontoso\\administrator <span class="token operator">-</span>Restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="dhcp服务" tabindex="-1"><a class="header-anchor" href="#dhcp服务"><span>DHCP服务</span></a></h2><p>whoami</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>whoami
minicontoso\\administrator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Get-WindowsFeature DHCP</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Get-WindowsFeature</span> DHCP

Display Name                                            Name                       Install State
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>                                            <span class="token operator">--</span><span class="token operator">--</span>                       <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token punctuation">[</span> <span class="token punctuation">]</span> DHCP Server                                         DHCP                           Available
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装DHCP服务</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Install-WindowsFeature</span> DHCP <span class="token operator">-</span>IncludeManagementTools

Success Restart Needed <span class="token keyword">Exit</span> Code      Feature Result                               
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>                               
True    No             Success        <span class="token punctuation">{</span>DHCP Server<span class="token punctuation">,</span> Remote Server Administration<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>授权DHCP服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Add-DhcpServerInDC</span> <span class="token operator">-</span>DnsName DHCP02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>IPAddress 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerInDC</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Get-DhcpServerInDC</span>

IPAddress            DnsName
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>            <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                                                                         
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>21          dhcp01<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>22          dhcp02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置故障转移" tabindex="-1"><a class="header-anchor" href="#配置故障转移"><span>配置故障转移</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Add-DhcpServerv4Failover <span class="token operator">-</span>ComputerName DHCP01<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>PartnerServer DHCP02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>Name DHCP-HA <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0<span class="token punctuation">,</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4Failover</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4Failover

Name                : DHCP-HA
PartnerServer       : DHCP02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com
Mode                : LoadBalance
LoadBalancePercent  : 50
ServerRole          : 
ReservePercent      : 
MaxClientLeadTime   : 01:00:00
StateSwitchInterval : 
State               : Normal
ScopeId             : <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0<span class="token punctuation">,</span> 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0<span class="token punctuation">}</span>
AutoStateTransition : False
EnableAuth          : False
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DHCP故障转移有负载均衡和主备两种工作模式，负载均衡是默认的模式，50%-50%。</p><p>In load balancing mode, when a DHCP server loses contact with its failover partner it will begin granting leases to all DHCP clients. If it receives a lease renewal request from a DHCP client that is assigned to its failover partner, it will temporarily renew the same IP address lease for the duration of the MCLT. If it receives a request from a client that was not previously assigned a lease, it will grant a new lease from its free IP address pool until this is exhausted, and then it will begin using the free IP address pool of its failover partner. If the DHCP server enters a partner down state, it will wait for the MCLT duration and then assume responsibility for 100% of the IP address pool.</p><p>或者</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Add-DhcpServerv4Failover <span class="token operator">-</span>ComputerName DHCP01<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>PartnerServer DHCP02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>Name DHCP-HA <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0<span class="token punctuation">,</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token operator">-</span>MaxClientLeadTime 2:00:00 <span class="token operator">-</span>AutoStateTransition <span class="token boolean">$true</span> <span class="token operator">-</span>StateSwitchInterval 2:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4Failover</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4Failover

Name                : DHCP-HA
PartnerServer       : DHCP02<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com
Mode                : LoadBalance
LoadBalancePercent  : 50
ServerRole          : 
ReservePercent      : 
MaxClientLeadTime   : 02:00:00
StateSwitchInterval : 02:00:00
State               : Normal
ScopeId             : <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0<span class="token punctuation">,</span> 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0<span class="token punctuation">}</span>
AutoStateTransition : True
EnableAuth          : False
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The maximum client lead time for the failover relationship is set to 2 hours.</p><p>The automatic state transition from the COMMUNICATION INTERRUPTED state to the PARTNER DOWN state is turned on.</p><p>The timer for automatic state transition is set to 2 hours.</p>`,33),p=[o];function l(i,r){return s(),a("div",null,p)}const u=n(t,[["render",l],["__file","dhcp02.html.vue"]]),v=JSON.parse('{"path":"/dhcp/dhcp02.html","title":"配置DHCP高可用","lang":"zh-CN","frontmatter":{"title":"配置DHCP高可用","icon":"gears","order":3,"category":["DHCP"],"tag":["DHCP"],"description":"前提准备 操作系统 系统命名 IP地址 加域 DHCP服务 whoami Get-WindowsFeature DHCP 安装DHCP服务 授权DHCP服务器 Get-DhcpServerInDC 配置故障转移 Get-DhcpServerv4Failover DHCP故障转移有负载均衡和主备两种工作模式，负载均衡是默认的模式，50%-50%。 In ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/dhcp/dhcp02.html"}],["meta",{"property":"og:site_name","content":"minicontoso"}],["meta",{"property":"og:title","content":"配置DHCP高可用"}],["meta",{"property":"og:description","content":"前提准备 操作系统 系统命名 IP地址 加域 DHCP服务 whoami Get-WindowsFeature DHCP 安装DHCP服务 授权DHCP服务器 Get-DhcpServerInDC 配置故障转移 Get-DhcpServerv4Failover DHCP故障转移有负载均衡和主备两种工作模式，负载均衡是默认的模式，50%-50%。 In ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"Echo"}],["meta",{"property":"article:tag","content":"DHCP"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置DHCP高可用\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Echo\\",\\"url\\":\\"https://www.minicontoso.com\\"}]}"]]},"headers":[{"level":2,"title":"前提准备","slug":"前提准备","link":"#前提准备","children":[]},{"level":2,"title":"DHCP服务","slug":"dhcp服务","link":"#dhcp服务","children":[]},{"level":2,"title":"配置故障转移","slug":"配置故障转移","link":"#配置故障转移","children":[]}],"git":{},"readingTime":{"minutes":1.57,"words":470},"filePathRelative":"dhcp/dhcp02.md","autoDesc":true}');export{u as comp,v as data};
