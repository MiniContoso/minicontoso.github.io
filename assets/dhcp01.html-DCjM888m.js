import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,b as e}from"./app-DHNsKz1s.js";const p={},t=e(`<h2 id="前提准备" tabindex="-1"><a class="header-anchor" href="#前提准备"><span>前提准备</span></a></h2><p>操作系统</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token punctuation">(</span><span class="token function">Get-CimInstance</span> <span class="token operator">-</span>ClassName Win32_OperatingSystem<span class="token punctuation">)</span><span class="token punctuation">.</span>Caption
Microsoft Windows Server 2022 Standard Evaluation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>系统命名</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Rename-Computer</span> <span class="token operator">-</span>NewName DHCP01 <span class="token operator">-</span>Restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>IP地址</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>IP地址：10.10.10.21
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>授权DHCP服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Add-DhcpServerInDC</span> <span class="token operator">-</span>DnsName DHCP01<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com <span class="token operator">-</span>IPAddress 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>21
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerInDC</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Get-DhcpServerInDC</span>

IPAddress            DnsName
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>            <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                                                                         
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>21          dhcp01<span class="token punctuation">.</span>minicontoso<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域"><span>作用域</span></a></h2><p>新建作用域</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Add-DhcpServerv4Scope <span class="token operator">-</span>Name <span class="token string">&quot;WinServer VLAN&quot;</span> <span class="token operator">-</span>Description <span class="token string">&quot;Windows Server VLAN&quot;</span> <span class="token operator">-</span>StartRange 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>100 <span class="token operator">-</span>EndRange 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>200 <span class="token operator">-</span>SubnetMask 255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0 <span class="token operator">-</span>LeaseDuration 8<span class="token punctuation">.</span>00:00:00 <span class="token operator">-</span>State Active
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4Scope</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4Scope

ScopeId         SubnetMask      Name           State    StartRange      EndRange        LeaseDuration
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>      <span class="token operator">--</span><span class="token operator">--</span>           <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>    <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                                                                                         
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   WinServer VLAN Active   10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>100    10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>200    8<span class="token punctuation">.</span>00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ScopeId，在配置作用域配置选项时，以及在配置DHCP故障转移时，作为标识符会用到</p><p>配置作用域选项</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Set</span><span class="token operator">-</span>DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0 <span class="token operator">-</span>Router 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>1 <span class="token operator">-</span>DnsServer 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">,</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4OptionValue</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0 <span class="token punctuation">|</span> <span class="token function">Format-Table</span> <span class="token operator">-</span>AutoSize

OptionId Name        <span class="token function">Type</span>        Value                      VendorClass UserClass PolicyName
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
51       Lease       DWord       <span class="token punctuation">{</span>691200<span class="token punctuation">}</span>                                                   
3        Router      IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>1<span class="token punctuation">}</span>                                               
6        DNS Servers IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">,</span> 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>11<span class="token punctuation">}</span>                                 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多vlan支持" tabindex="-1"><a class="header-anchor" href="#多vlan支持"><span>多VLAN支持</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Add-DhcpServerv4Scope <span class="token operator">-</span><span class="token function">Type</span> Both <span class="token operator">-</span>Name <span class="token string">&quot;MDT VLAN&quot;</span> <span class="token operator">-</span>Description <span class="token string">&quot;Windows OS Deployment VLAN&quot;</span> <span class="token operator">-</span>StartRange 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>100 <span class="token operator">-</span>EndRange 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>200 <span class="token operator">-</span>SubnetMask 255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0 <span class="token operator">-</span>LeaseDuration 1<span class="token punctuation">.</span>00:00:00 <span class="token operator">-</span>State Active
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>-Type</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> DHCP</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> BOOTP</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> Both</label></li></ul><p>Get-DhcpServerv4Scope</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4Scope

ScopeId         SubnetMask      Name           State    StartRange      EndRange        LeaseDuration
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>      <span class="token operator">--</span><span class="token operator">--</span>           <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>    <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   WinServer VLAN Active   10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>100    10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>200    8<span class="token punctuation">.</span>00:00:00
10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   MDT VLAN       Active   10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>100    10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>200    1<span class="token punctuation">.</span>00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置作用域选项</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Set</span><span class="token operator">-</span>DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token operator">-</span>Router 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>1 <span class="token operator">-</span>DnsServer 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">,</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4OptionValue</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token punctuation">|</span> <span class="token function">Format-Table</span> <span class="token operator">-</span>AutoSize

OptionId Name        <span class="token function">Type</span>        Value                      VendorClass UserClass PolicyName
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
51       Lease       DWord       <span class="token punctuation">{</span>86400<span class="token punctuation">}</span>                                                    
3        Router      IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>1<span class="token punctuation">}</span>                                               
6        DNS Servers IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">,</span> 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>11<span class="token punctuation">}</span>                               
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置66选项（Boot Server Host Name） 网络部署操作系统时，使用</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token function">Set</span><span class="token operator">-</span>DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token operator">-</span>OptionId 66 <span class="token operator">-</span>Value <span class="token string">&quot;10.10.20.20&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Get-DhcpServerv4OptionValue</p><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>Get-DhcpServerv4OptionValue <span class="token operator">-</span>ScopeId 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token punctuation">|</span> <span class="token function">Format-Table</span> <span class="token operator">-</span>AutoSize

OptionId Name                  <span class="token function">Type</span>        Value                      VendorClass UserClass PolicyName
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>                  <span class="token operator">--</span><span class="token operator">--</span>        <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
51       Lease                 DWord       <span class="token punctuation">{</span>86400<span class="token punctuation">}</span>
3        Router                IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>1<span class="token punctuation">}</span>
6        DNS Servers           IPv4Address <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">,</span> 10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>11<span class="token punctuation">}</span>
66       Boot Server Host Name String      <span class="token punctuation">{</span>10<span class="token punctuation">.</span>10<span class="token punctuation">.</span>20<span class="token punctuation">.</span>20<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置ip helper</p><table><thead><tr><th>VLAN</th><th>用途</th><th>网络</th></tr></thead><tbody><tr><td>10</td><td>Windows Server VLAN</td><td>10.10.10.0 / 24</td></tr><tr><td>20</td><td>Windows OS Deployment VLAN</td><td>10.10.20.0 / 24</td></tr></tbody></table><p>DHCP服务器：10.10.10.21</p><p>Cisco交换机上配置</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>interface vlan <span class="token number">20</span>
<span class="token function">ip</span> helper-address <span class="token number">10.10</span>.10.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>H3C交换机上配置</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>interface vlan-interface <span class="token number">20</span>
dhcp <span class="token keyword">select</span> relay
dhcp relay server-address <span class="token number">10.10</span>.10.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,51),o=[t];function l(c,r){return n(),a("div",null,o)}const d=s(p,[["render",l],["__file","dhcp01.html.vue"]]),k=JSON.parse('{"path":"/dhcp/dhcp01.html","title":"安装DHCP服务器","lang":"zh-CN","frontmatter":{"title":"安装DHCP服务器","icon":"gear","order":2,"category":["DHCP"],"tag":["DHCP"],"description":"前提准备 操作系统 系统命名 IP地址 加域 DHCP服务 whoami Get-WindowsFeature DHCP 安装DHCP服务 授权DHCP服务器 Get-DhcpServerInDC 作用域 新建作用域 Get-DhcpServerv4Scope ScopeId，在配置作用域配置选项时，以及在配置DHCP故障转移时，作为标识符会用到 配置...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/dhcp/dhcp01.html"}],["meta",{"property":"og:site_name","content":"minicontoso"}],["meta",{"property":"og:title","content":"安装DHCP服务器"}],["meta",{"property":"og:description","content":"前提准备 操作系统 系统命名 IP地址 加域 DHCP服务 whoami Get-WindowsFeature DHCP 安装DHCP服务 授权DHCP服务器 Get-DhcpServerInDC 作用域 新建作用域 Get-DhcpServerv4Scope ScopeId，在配置作用域配置选项时，以及在配置DHCP故障转移时，作为标识符会用到 配置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"Echo"}],["meta",{"property":"article:tag","content":"DHCP"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安装DHCP服务器\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Echo\\",\\"url\\":\\"https://www.minicontoso.com\\"}]}"]]},"headers":[{"level":2,"title":"前提准备","slug":"前提准备","link":"#前提准备","children":[]},{"level":2,"title":"DHCP服务","slug":"dhcp服务","link":"#dhcp服务","children":[]},{"level":2,"title":"作用域","slug":"作用域","link":"#作用域","children":[]},{"level":2,"title":"多VLAN支持","slug":"多vlan支持","link":"#多vlan支持","children":[]}],"git":{},"readingTime":{"minutes":1.78,"words":535},"filePathRelative":"dhcp/dhcp01.md","autoDesc":true}');export{d as comp,k as data};
