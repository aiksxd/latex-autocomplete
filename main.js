const { Plugin, PluginSettingTab, Setting, Notice, EditorSuggest, EditorSuggestContext, EditorPosition, Editor, TextAreaComponent } = require('obsidian');

// LaTeX keyword map
const DEFAULT_LATEX_MAPPINGS = {
  "alpha": "\\alpha",
  "beta": "\\beta",
  "gamma": "\\gamma",
  "delta": "\\delta",
  "epsilon": "\\epsilon",
  "zeta": "\\zeta",
  "eta": "\\eta",
  "theta": "\\theta",
  "iota": "\\iota",
  "kappa": "\\kappa",
  "lambda": "\\lambda",
  "mu": "\\mu",
  "nu": "\\nu",
  "xi": "\\xi",
  "pi": "\\pi",
  "rho": "\\rho",
  "sigma": "\\sigma",
  "tau": "\\tau",
  "phi": "\\phi",
  "chi": "\\chi",
  "psi": "\\psi",
  "omega": "\\omega",
  "times": "\\times",
  "div": "\\div",
  "pm": "\\pm",
  "mp": "\\mp",
  "leq": "\\leq",
  "geq": "\\geq",
  "neq": "\\neq",
  "approx": "\\approx",
  "to": "\\to",
  "gets": "\\gets",
  "infty": "\\infty",
  "nabla": "\\nabla",
  "partial": "\\partial",
  "sin": "\\sin",
  "cos": "\\cos",
  "tan": "\\tan",
  "log": "\\log",
  "ln": "\\ln",
  "frac": "\\frac{$1}{$2}",
  "dfrac": "\\dfrac{$1}{$2}",
  "sqrt": "\\sqrt{$1}",
  "int": "\\int_{$1}^{$2}",
  "sum": "\\sum",
  "prod": "\\prod",
  "matrix": "\\begin{matrix}\n$1 & $2 \\\\\n$3 & $4\n\\end{matrix}",
  "pmatrix": "\\begin{pmatrix}\n$1 & $2 \\\\\n$3 & $4\n\\end{pmatrix}",
  "equation": "\\begin{equation}\n$1\n\\end{equation}",
  "Alpha": "\\Alpha",
  "Beta": "\\Beta",
  "Gamma": "\\Gamma",
  "Delta": "\\Delta",
  "Epsilon": "\\Epsilon",
  "Zeta": "\\Zeta",
  "Eta": "\\Eta",
  "Theta": "\\Theta",
  "Iota": "\\Iota",
  "Kappa": "\\Kappa",
  "Lambda": "\\Lambda",
  "Mu": "\\Mu",
  "Nu": "\\Nu",
  "Xi": "\\Xi",
  "Pi": "\\Pi",
  "Rho": "\\Rho",
  "Sigma": "\\Sigma",
  "Tau": "\\Tau",
  "Phi": "\\Phi",
  "Chi": "\\Chi",
  "Psi": "\\Psi",
  "Omega": "\\Omega",
  "forall": "\\forall",
  "exists": "\\exists",
  "emptyset": "\\emptyset",
  "in": "\\in",
  "notin": "\\notin",
  "subset": "\\subset",
  "subseteq": "\\subseteq",
  "supset": "\\supset",
  "supseteq": "\\supseteq",
  "cap": "\\cap",
  "cup": "\\cup",
  "bigcap": "\\bigcap",
  "bigcup": "\\bigcup",
  "therefore": "\\therefore",
  "because": "\\because",
  "mapsto": "\\mapsto",
  "to": "\\to",
  "gets": "\\gets",
  "rightarrow": "\\rightarrow",
  "leftarrow": "\\leftarrow",
  "Rightarrow": "\\Rightarrow",
  "Leftarrow": "\\Leftarrow",
  "leftrightarrow": "\\leftrightarrow",
  "Leftrightarrow": "\\Leftrightarrow",
  "uparrow": "\\uparrow",
  "downarrow": "\\downarrow",
  "updownarrow": "\\updownarrow",
  "Uparrow": "\\Uparrow",
  "Downarrow": "\\Downarrow",
  "Updownarrow": "\\Updownarrow",
  "aleph": "\\aleph",
  "hbar": "\\hbar",
  "ell": "\\ell",
  "Re": "\\Re",
  "Im": "\\Im",
  "wp": "\\wp",
  "otimes": "\\otimes",
  "oplus": "\\oplus",
  "oslash": "\\oslash",
  "odot": "\\odot",
  "bigcirc": "\\bigcirc",
  "bigodot": "\\bigodot",
  "bigoplus": "\\bigoplus",
  "bigotimes": "\\bigotimes",
  "biguplus": "\\biguplus",
  "dagger": "\\dagger",
  "ddagger": "\\ddagger",
  "S": "\\S",
  "P": "\\P",
  "copyright": "\\copyright",
  "pounds": "\\pounds",
  "lnot": "\\lnot",
  "land": "\\land",
  "lor": "\\lor",
  "implies": "\\implies",
  "iff": "\\iff",
  "neg": "\\neg",
  "top": "\\top",
  "bot": "\\bot",
  "vdash": "\\vdash",
  "dashv": "\\dashv",
  "equiv": "\\equiv",
  "cong": "\\cong",
  "sim": "\\sim",
  "simeq": "\\simeq",
  "asymp": "\\asymp",
  "approx": "\\approx",
  "propto": "\\propto",
  "models": "\\models",
  "perp": "\\perp",
  "mid": "\\mid",
  "parallel": "\\parallel",
  "nparallel": "\\nparallel",
  "bowtie": "\\bowtie",
  "Join": "\\Join",
  "smile": "\\smile",
  "frown": "\\frown",
  "wr": "\\wr",
  "diamond": "\\diamond",
  "heartsuit": "\\heartsuit",
  "clubsuit": "\\clubsuit",
  "spadesuit": "\\spadesuit",
  "arccos": "\\arccos",
  "arcsin": "\\arcsin",
  "arctan": "\\arctan",
  "cosh": "\\cosh",
  "coth": "\\coth",
  "csc": "\\csc",
  "deg": "\\deg",
  "det": "\\det",
  "dim": "\\dim",
  "exp": "\\exp",
  "gcd": "\\gcd",
  "hom": "\\hom",
  "inf": "\\inf",
  "ker": "\\ker",
  "lg": "\\lg",
  "liminf": "\\liminf",
  "limsup": "\\limsup",
  "Pr": "\\Pr",
  "sec": "\\sec",
  "sinh": "\\sinh",
  "sup": "\\sup",
  "tanh": "\\tanh",
  "lbrace": "\\{",
  "rbrace": "\\}",
  "langle": "\\langle",
  "rangle": "\\rangle",
  "lceil": "\\lceil",
  "rceil": "\\rceil",
  "lfloor": "\\lfloor",
  "rfloor": "\\rfloor",
  "oint": "\\oint_{$1}^{$2}",
  "vec": "\\vec[$1]",
  "cdot": "\\cdot",
};

// preview keyword map
const PREVIEW_SYMBOLS = {
  "\\alpha": "α",
  "\\beta": "β",
  "\\gamma": "γ",
  "\\delta": "δ",
  "\\epsilon": "ε",
  "\\zeta": "ζ",
  "\\eta": "η",
  "\\theta": "θ",
  "\\iota": "ι",
  "\\kappa": "κ",
  "\\lambda": "λ",
  "\\mu": "μ",
  "\\nu": "ν",
  "\\xi": "ξ",
  "\\pi": "π",
  "\\rho": "ρ",
  "\\sigma": "σ",
  "\\tau": "τ",
  "\\phi": "φ",
  "\\chi": "χ",
  "\\psi": "ψ",
  "\\omega": "ω",
  "\\times": "×",
  "\\div": "÷",
  "\\pm": "±",
  "\\mp": "∓",
  "\\leq": "≤",
  "\\geq": "≥",
  "\\neq": "≠",
  "\\approx": "≈",
  "\\to": "→",
  "\\gets": "←",
  "\\infty": "∞",
  "\\nabla": "∇",
  "\\partial": "∂",
  "\\int_{$1}^{$2}": "∫_{$1}^{$2}",
  "\\sum": "∑",
  "\\prod": "∏",
  "\\Alpha": "A",
  "\\Beta": "B",
  "\\Gamma": "Γ",
  "\\Delta": "Δ",
  "\\Epsilon": "E",
  "\\Zeta": "Z",
  "\\Eta": "H",
  "\\Theta": "Θ",
  "\\Iota": "I",
  "\\Kappa": "K",
  "\\Lambda": "Λ",
  "\\Mu": "M",
  "\\Nu": "N",
  "\\Xi": "Ξ",
  "\\Pi": "Π",
  "\\Rho": "P",
  "\\Sigma": "Σ",
  "\\Tau": "T",
  "\\Phi": "Φ",
  "\\Chi": "X",
  "\\Psi": "Ψ",
  "\\Omega": "Ω",
  "\\forall": "∀",
  "\\exists": "∃",
  "\\emptyset": "∅",
  "\\in": "∈",
  "\\notin": "∉",
  "\\subset": "⊂",
  "\\subseteq": "⊆",
  "\\supset": "⊃",
  "\\supseteq": "⊇",
  "\\cap": "∩",
  "\\cup": "∪",
  "\\bigcap": "⋂",
  "\\bigcup": "⋃",
  "\\therefore": "∴",
  "\\because": "∵",
  "\\mapsto": "↦",
  "\\to": "→",
  "\\gets": "←",
  "\\rightarrow": "→",
  "\\leftarrow": "←",
  "\\Rightarrow": "⇒",
  "\\Leftarrow": "⇐",
  "\\leftrightarrow": "↔",
  "\\Leftrightarrow": "⇔",
  "\\uparrow": "↑",
  "\\downarrow": "↓",
  "\\updownarrow": "↕",
  "\\Uparrow": "⇑",
  "\\Downarrow": "⇓",
  "\\Updownarrow": "⇕",
  "\\aleph": "ℵ",
  "\\hbar": "ℏ",
  "\\ell": "ℓ",
  "\\Re": "ℜ",
  "\\Im": "ℑ",
  "\\wp": "℘",
  "\\otimes": "⊗",
  "\\oplus": "⊕",
  "\\oslash": "⊘",
  "\\odot": "⊙",
  "\\bigcirc": "◯",
  "\\dagger": "†",
  "\\ddagger": "‡",
  "\\S": "§",
  "\\P": "¶",
  "\\copyright": "©",
  "\\pounds": "£",
  "\\lnot": "¬",
  "\\land": "∧",
  "\\lor": "∨",
  "\\implies": "⇒",
  "\\iff": "⇔",
  "\\neg": "¬",
  "\\top": "⊤",
  "\\bot": "⊥",
  "\\vdash": "⊢",
  "\\dashv": "⊣",
  "\\equiv": "≡",
  "\\cong": "≅",
  "\\sim": "∼",
  "\\simeq": "≃",
  "\\asymp": "≍",
  "\\approx": "≈",
  "\\propto": "∝",
  "\\models": "⊧",
  "\\perp": "⊥",
  "\\mid": "∣",
  "\\parallel": "∥",
  "\\nparallel": "∦",
  "\\bowtie": "⋈",
  "\\Join": "⋈",
  "\\smile": "⌣",
  "\\frown": "⌢",
  "\\wr": "≀",
  "\\diamond": "⋄",
  "\\heartsuit": "♡",
  "\\clubsuit": "♣",
  "\\spadesuit": "♠",
  "\\langle": "⟨",
  "\\rangle": "⟩",
  "\\lceil": "⌈",
  "\\rceil": "⌉",
  "\\lfloor": "⌊",
  "\\rfloor": "⌋",
};

// default value
const DEFAULT_SETTINGS = {
  showSuggestionsAfter: 1,  // mininmun characters' length
  latexMappings: JSON.stringify(DEFAULT_LATEX_MAPPINGS, null, 2),
  previewSymbols: JSON.stringify(PREVIEW_SYMBOLS, null, 2) // 预览符号映射设置
};

class LatexSuggest extends EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.mappings = {};
    this.previewSymbols = {};
    this.latexMode = false;
    this.lastWordStart = null;
    this.updateMappings();
  }

  updateMappings() {
    try {
      this.mappings = JSON.parse(this.plugin.settings.latexMappings);
    } catch (e) {
      console.error("Failed to parse LaTeX mappings:", e);
      this.mappings = DEFAULT_LATEX_MAPPINGS;
    }
    try {
      this.previewSymbols = JSON.parse(this.plugin.settings.previewSymbols);
    } catch (e) {
      console.error("Failed to parse preview symbols:", e);
      this.previewSymbols = PREVIEW_SYMBOLS;
    }
  }

  getSuggestions(context) {
    if (!this.latexMode) return [];
    
    const query = context.query.toLowerCase();
    if (!query) return [];
    
    return Object.entries(this.mappings)
      .filter(([key]) => key.toLowerCase().includes(query))
      .map(([key, value]) => ({
        key,
        value,
        preview: this.previewSymbols[value] || value
      }));
  }

  renderSuggestion(suggestion, el) {
    el.createEl("div", { text: suggestion.key, cls: "latex-suggest-key" });
    el.createEl("small", { text: suggestion.preview, cls: "latex-suggest-value" });
  }

  selectSuggestion(suggestion, event) {
    if (!this.context) return;
    
    const editor = this.context.editor;
    const start = this.context.start;
    const end = this.context.end;
    
    // replace original text
    editor.replaceRange(suggestion.value, start, end);
    
    // handle $num
    this.handlePlaceholders(editor, start.line);
    this.lastWordStart = null; // reset position of word
    this.close();
  }
  
  handlePlaceholders(editor, lineNum) {
    // const cursor = editor.getCursor();
    const newContent = editor.getLine(lineNum);
    const placeholderRegex = /\$(\d+)/g;
    let firstPlaceholder = null;
    
    let match;
    while ((match = placeholderRegex.exec(newContent)) !== null) {
      if (!firstPlaceholder) {
        firstPlaceholder = {
          line: lineNum,
          ch: match.index
        };
      }
    }
    
    if (firstPlaceholder) {
      const placeholderEnd = {
        line: firstPlaceholder.line,
        ch: firstPlaceholder.ch + 2
      };
      editor.setCursor(firstPlaceholder);
      editor.setSelection(firstPlaceholder, placeholderEnd);
    }
  }

  isInLatexBlock(editor, cursor) {
    // scan current line
    const line = editor.getLine(cursor.line);
    const textBeforeCursor = line.substring(0, cursor.ch);
    
    let count = 0;
    let inEscape = false;
    
    for (let i = 0; i < textBeforeCursor.length; i++) {
      const char = textBeforeCursor[i];
      
      if (char === '\\' && !inEscape) {
        inEscape = true;
        continue;
      }
      
      if (char === '$' && !inEscape) {
        // check if $ and $ -> "$$"
        if (i + 1 < textBeforeCursor.length && textBeforeCursor[i + 1] === '$') {
          count++;
          i++;
        }
      }
      
      if (inEscape) {
        inEscape = false;
      }
    }
    
    // odd means in LaTeX Tags
    if (count % 2 === 1) {
      return true;
    }
    
    // scan up $$
    let openBlock = false;
    for (let lineNum = cursor.line - 1; lineNum >= 0; lineNum--) {
      const lineText = editor.getLine(lineNum);
      let lineCount = 0;
      inEscape = false;
      
      for (let i = 0; i < lineText.length; i++) {
        const char = lineText[i];
        
        if (char === '\\' && !inEscape) {
          inEscape = true;
          continue;
        }
        
        if (char === '$' && !inEscape) {
          if (i + 1 < lineText.length && lineText[i + 1] === '$') {
            lineCount++;
            i++;
          }
        }
        
        if (inEscape) {
          inEscape = false;
        }
      }
      
      // transform mode
      if (lineCount % 2 === 1) {
        openBlock = !openBlock;
      }
    }
    
    return openBlock;
  }

  onTrigger(cursor, editor) {
    const inBlockFormula = this.isInLatexBlock(editor, cursor);

    const line = editor.getLine(cursor.line);
    const textBeforeCursor = line.substring(0, cursor.ch);
    const singleDollarCount = (textBeforeCursor.match(/\$(?<!\$\$)/g) || []).length;

    this.latexMode = inBlockFormula || (singleDollarCount % 2 === 1);
    
    if (!this.latexMode) {
      this.lastWordStart = null;
      return null;
    }

    // space: cancel complete
    if (textBeforeCursor.endsWith(" ") || textBeforeCursor.endsWith("$")) {
      this.lastWordStart = null;
      this.close();
      return null;
    }

    // find the word
    if (this.lastWordStart === null || cursor.ch < this.lastWordStart.ch) {
      // from cursor to left
      let wordStart = cursor.ch;
      while (wordStart > 0) {
        const prevChar = line.charAt(wordStart - 1);
        if (prevChar === ' ' || prevChar === '$' || prevChar === '\\' || prevChar === '\{') {
          break;
        }
        wordStart--;
      }
      this.lastWordStart = { line: cursor.line, ch: wordStart };
    }
    const currentWord = line.substring(this.lastWordStart.ch, cursor.ch);

    // mininum characters
    if (currentWord.length < this.plugin.settings.showSuggestionsAfter) {
      this.close();
      return null;
    }

    return {
      start: this.lastWordStart,
      end: cursor,
      query: currentWord
    };
  }
  
  // cover default keyEvent
  onKeyEvent(event, editor) {
    if (!this.latexMode) return false;
    
    // space: cancel complete
    if (event.key === " ") {
      this.close();
      this.lastWordStart = null;
      return false;
    }
    // Enter: apply suggestion
    if (event.key === "Enter" && this.suggestions?.length > 0) {
      const selected = this.suggestions[this.selectedItem];
      if (selected) {
        this.selectSuggestion(selected, event);
        return true;
      }
    }
    
    return super.onKeyEvent(event, editor);
  }
}
module.exports = class LatexAutoCompletePlugin extends Plugin {
  locale = {};
  
  async onload() {
    this.loadLocale();
    
    await this.loadSettings();
    
    this.latexSuggest = new LatexSuggest(this);
    this.registerEditorSuggest(this.latexSuggest);
    
    this.addSettingTab(new LatexAutoCompleteSettingTab(this.app, this));
    
    new Notice(this.locale.plugin_loaded);
  }
  
  loadLocale() {
    // get Obsidian language
    const lang = (this.app.vault.config.language || 'en').toLowerCase();
    const langCode = lang.startsWith('zh') ? 'zh' : 'en';
    
    this.locale = {
      en: {
        "settings_title": "LaTeX Auto Complete Settings",
        "min_trigger_chars": "Minimal trigger characters",
        "min_trigger_chars_desc": "Show suggestions after typing this many characters",
        "latex_mappings": "LaTeX mappings",
        "latex_mappings_desc": "Custom LaTeX keyword mappings (JSON format)",
        "restore_defaults": "Restore defaults",
        "defaults_restored": "Defaults restored successfully",
        "invalid_json": "Invalid JSON: ",
        "usage_title": "Usage guide",
        "usage_point1": "Place cursor inside '$$' / '$', then type any character to trigger completion",
        "usage_point2": "Use '↑/↓' keys to navigate suggestions, 'Enter' to apply",
        "usage_point3": "Press 'Space' to cancel current completion and start new word",
        "examples_title": "Examples",
        "example_action": "Action",
        "example_effect": "Result",
        "example1_input": "Place cursor inside '$$' / '$'",
        "example1_output": "Enter LaTeX mode",
        "example2_input": "Type 'a'",
        "example2_output": "Show α suggestion",
        "example3_input": "1. Press 'Enter'",
        "example3_output": "Insert \\alpha",
        "example4_input": "2. Press 'Space'",
        "example4_output": "Cancel completion",
        "plugin_loaded": "LaTeX Auto Complete plugin loaded!",
        "plugin_unloaded": "'LaTeX Auto Complete' plugin unloaded",
        "preview_mappings": "Preview symbols mappings",
        "preview_mappings_desc": "Custom preview symbols for LaTeX commands (JSON format)",
        "preview_defaults_restored": "Preview symbols defaults restored successfully",
      },
      zh: {
        "settings_title": "LaTeX 自动补全设置",
        "min_trigger_chars": "最小触发字符数",
        "min_trigger_chars_desc": "输入几个字符后显示建议",
        "latex_mappings": "LaTeX 映射配置",
        "latex_mappings_desc": "自定义LaTeX关键词映射（JSON格式）",
        "restore_defaults": "恢复默认设置",
        "defaults_restored": "默认设置已成功恢复",
        "invalid_json": "JSON格式错误: ",
        "usage_title": "使用指南",
        "usage_point1": "输入 '$$' / '$' 进入LaTeX模式，输入任意字符触发补全",
        "usage_point2": "使用 '↑/↓' 选择建议，按'Enter'键应用补全",
        "usage_point3": "按空格键取消当前单词补全",
        "examples_title": "示例",
        "example_action": "操作",
        "example_effect": "效果",
        "example1_input": "光标位于 '$$' / '$' 内",
        "example1_output": "进入LaTeX模式",
        "example2_input": "输入a",
        "example2_output": "显示α建议",
        "example3_input": "1.按'Enter'",
        "example3_output": "插入\\alpha",
        "example4_input": "2.按'空格'",
        "example4_output": "取消补全",
        "plugin_loaded": "LaTeX自动补全插件已加载！",
        "plugin_unloaded": "LaTeX自动补全插件已卸载",
        "preview_mappings": "预览符号映射",
        "preview_mappings_desc": "自定义LaTeX命令的预览符号（JSON格式）",
        "preview_defaults_restored": "预览符号默认设置已成功恢复"
      }
    }[langCode];
  }
  
  onunload() {
    this.statusBarItem?.setText("");
    new Notice(this.locale.plugin_unloaded);
  }
  
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    if (this.latexSuggest) {
      this.latexSuggest.updateMappings();
    }
  }
  
  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class LatexAutoCompleteSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.errorMsg = "";
    this.previewErrorMsg = "";
  }
  
  display() {
    const { containerEl } = this;
    const t = this.plugin.locale;
    
    containerEl.empty();
    
    // mininum characters of activating conplete
    new Setting(containerEl)
      .setName(t.min_trigger_chars)
      .setDesc(t.min_trigger_chars_desc)
      .addSlider(slider => slider
        .setLimits(1, 5, 1)
        .setValue(this.plugin.settings.showSuggestionsAfter)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.showSuggestionsAfter = value;
          await this.plugin.saveSettings();
        })
      );
    
    // config: LaTeX map
    const mappingSetting = new Setting(containerEl)
      .setName(t.latex_mappings)
      .setDesc(t.latex_mappings_desc);
    
    const textArea = new TextAreaComponent(mappingSetting.controlEl);
    textArea
      .setValue(this.plugin.settings.latexMappings)
      .onChange(async (value) => {
        try {
          JSON.parse(value);
          this.plugin.settings.latexMappings = value;
          await this.plugin.saveSettings();
          this.plugin.latexSuggest.updateMappings();
          this.errorMsg = "";
        } catch (e) {
          this.errorMsg = `${t.invalid_json}${e.message}`;
        }
        this.displayError();
      });
    
    // textArea css
    textArea.inputEl.rows = 15;
    textArea.inputEl.addClass('latex-textarea')
    
    // show error
    this.errorDisplay = mappingSetting.descEl.createEl('div', {
      cls: 'latex-settings-error',
      text: this.errorMsg
    });
    
    // restore button
    mappingSetting.addButton(button => {
      button
        .setButtonText(t.restore_defaults)
        .setCta()
        .onClick(async () => {
          const defaultMappings = JSON.stringify(DEFAULT_LATEX_MAPPINGS, null, 2);
          textArea.setValue(defaultMappings);
          this.plugin.settings.latexMappings = defaultMappings;
          await this.plugin.saveSettings();
          this.plugin.latexSuggest.updateMappings();
          this.errorMsg = "";
          this.displayError();
          new Notice(t.defaults_restored);
        });
    });
    
    // config: set preview
    const previewSetting = new Setting(containerEl)
      .setName(t.preview_mappings)
      .setDesc(t.preview_mappings_desc);
    
    const previewTextArea = new TextAreaComponent(previewSetting.controlEl);
    previewTextArea
      .setValue(this.plugin.settings.previewSymbols)
      .onChange(async (value) => {
        try {
          JSON.parse(value);
          this.plugin.settings.previewSymbols = value;
          await this.plugin.saveSettings();
          this.plugin.latexSuggest.updateMappings();
          this.previewErrorMsg = "";
        } catch (e) {
          this.previewErrorMsg = `${t.invalid_json}${e.message}`;
        }
        this.displayPreviewError();
      });
    
    previewTextArea.inputEl.rows = 10;
    previewTextArea.inputEl.addClass('latex-textarea');
    // preview Error
    this.previewErrorDisplay = previewSetting.descEl.createEl('div', {
      cls: 'latex-settings-error',
      text: this.previewErrorMsg
    });

    // Restore default button
    previewSetting.addButton(button => {
      button
        .setButtonText(t.restore_defaults)
        .setCta()
        .onClick(async () => {
          const defaultPreview = JSON.stringify(PREVIEW_SYMBOLS, null, 2);
          previewTextArea.setValue(defaultPreview);
          this.plugin.settings.previewSymbols = defaultPreview;
          await this.plugin.saveSettings();
          this.plugin.latexSuggest.updateMappings();
          this.previewErrorMsg = "";
          this.displayPreviewError();
          new Notice(t.preview_defaults_restored);
        });
    });
    
    // 使用说明区域
    const usageContainer = containerEl.createEl('div', { 
      cls: 'latex-settings-section' 
    });
    new Setting(usageContainer).setName(t.usage_title).setHeading();
    
    const usageList = usageContainer.createEl('ul');
    for (let i = 1; i <= 3; i++) {
      usageList.createEl('li', { text: t[`usage_point${i}`] });
    }
    
    // 示例区域
    const examplesContainer = containerEl.createEl('div', { 
      cls: 'latex-settings-section' 
    });
    new Setting(examplesContainer).setName(t.examples_title).setHeading();

    const exampleTable = examplesContainer.createEl('table', {
      cls: 'latex-examples-table'
    });
    
    // 表头
    const headerRow = exampleTable.createEl('tr');
    headerRow.createEl('th', { text: t.example_action });
    headerRow.createEl('th', { text: t.example_effect });
    
    // 示例数据
    const examples = [
      { input: t.example1_input, output: t.example1_output },
      { input: t.example2_input, output: t.example2_output },
      { input: t.example3_input, output: t.example3_output },
      { input: t.example4_input, output: t.example4_output }
    ];
    
    // 添加示例行
    examples.forEach(example => {
      const row = exampleTable.createEl('tr');
      
      const actionCell = row.createEl('td');
      actionCell.createEl('code', { text: example.input });
      
      row.createEl('td', { text: example.output });
    });
  }
  
  displayError() {
    if (this.errorDisplay) {
      this.errorDisplay.textContent = this.errorMsg;
      this.errorDisplay.style.display = this.errorMsg ? 'block' : 'none';
    }
  }
  
  displayPreviewError() {
    if (this.previewErrorDisplay) {
      this.previewErrorDisplay.textContent = this.previewErrorMsg;
      this.previewErrorDisplay.style.display = this.previewErrorMsg ? 'block' : 'none';
    }
  }
}