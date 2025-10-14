"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewBlogPost() {
  const [showPreview, setShowPreview] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    keywords: "",
    category: "Death Care",
    author: "EternaGuard Team",
    publishDate: new Date().toISOString().split('T')[0],
    status: "draft",
    metaDescription: "",
  });

  const [editorTools, setEditorTools] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title' && !postData.slug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setPostData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server/CDN
      const reader = new FileReader();
      reader.onload = (event) => {
        setPostData(prev => ({ ...prev, featuredImage: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = postData.content.substring(start, end);
    
    let formattedText = '';
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'bullet':
        formattedText = `- ${selectedText}`;
        break;
    }
    
    const newContent = postData.content.substring(0, start) + formattedText + postData.content.substring(end);
    setPostData(prev => ({ ...prev, content: newContent }));
  };

  const handlePublish = () => {
    setPostData(prev => ({ ...prev, status: 'published' }));
    alert('Post published successfully! (Demo only)');
    console.log('Published Post:', postData);
  };

  const handleSaveDraft = () => {
    setPostData(prev => ({ ...prev, status: 'draft' }));
    alert('Draft saved successfully! (Demo only)');
    console.log('Saved Draft:', postData);
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering for preview
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/## (.*?)(\n|$)/g, '<h2 class="text-3xl font-bold text-slate-900 mb-4 mt-6">$1</h2>')
      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-2xl font-bold text-slate-900 mb-3 mt-4">$1</h3>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-emerald-600 hover:underline">$1</a>')
      .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/cms-dashboard" className="flex items-center space-x-3">
              <img 
                src="/images/eternaguard-logo-wide.png" 
                alt="EternaGuard - Secure. Maintain. Innovate." 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-slate-600">| New Post</span>
            </Link>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
              >
                {showPreview ? '✏️ Edit' : '👁️ Preview'}
              </button>
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Publish
              </button>
              <Link
                href="/cms-dashboard"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                ← Back
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <input
                  type="text"
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                  placeholder="Enter post title..."
                  className="w-full text-4xl font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <div className="mt-4 flex items-center space-x-2 text-sm text-slate-500">
                  <span>URL:</span>
                  <span className="text-emerald-600">/blog/{postData.slug || 'your-post-slug'}</span>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                  
                  {/* Toolbar */}
                  <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-slate-200">
                    <button
                      type="button"
                      onClick={() => insertFormatting('bold')}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                      title="Bold"
                    >
                      <strong className="text-slate-700">B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('italic')}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                      title="Italic"
                    >
                      <em className="text-slate-700">I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('heading')}
                      className="px-3 py-2 hover:bg-slate-100 rounded transition-colors text-slate-700 font-semibold"
                      title="Heading"
                    >
                      H2
                    </button>
                    <div className="w-px h-6 bg-slate-300"></div>
                    <button
                      type="button"
                      onClick={() => insertFormatting('link')}
                      className="p-2 hover:bg-slate-100 rounded transition-colors text-slate-700"
                      title="Link"
                    >
                      🔗
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('bullet')}
                      className="p-2 hover:bg-slate-100 rounded transition-colors text-slate-700"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <div className="w-px h-6 bg-slate-300"></div>
                    <label className="p-2 hover:bg-slate-100 rounded transition-colors cursor-pointer text-slate-700" title="Insert Image">
                      🖼️
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          insertFormatting('link');
                        }
                      }} />
                    </label>
                  </div>

                  {/* Editor Textarea */}
                  <textarea
                    id="content"
                    name="content"
                    value={postData.content}
                    onChange={handleChange}
                    placeholder="Write your post content here... Use **bold**, *italic*, ## Headings, and [links](url)"
                    className="w-full h-96 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Tip: Use Markdown formatting - **bold**, *italic*, ## Heading, [link](url)
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label htmlFor="excerpt" className="block text-sm font-semibold text-slate-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={postData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary for social shares and listings..."
                  className="w-full h-24 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
                <p className="mt-2 text-xs text-slate-500">{postData.excerpt.length} / 160 characters</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Featured Image</label>
                {postData.featuredImage ? (
                  <div className="relative">
                    <img src={postData.featuredImage} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      onClick={() => setPostData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors">
                    <div className="text-center">
                      <p className="text-4xl mb-2">📷</p>
                      <p className="text-sm text-slate-600">Click to upload image</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              {/* Category */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option>Death Care</option>
                  <option>Cemetery Management</option>
                  <option>Technology</option>
                  <option>Best Practices</option>
                  <option>Case Studies</option>
                  <option>Industry News</option>
                </select>
              </div>

              {/* Keywords/Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label htmlFor="keywords" className="block text-sm font-semibold text-slate-700 mb-2">
                  Keywords (SEO)
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={postData.keywords}
                  onChange={handleChange}
                  placeholder="cemetery, AI, drones, property management"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="mt-2 text-xs text-slate-500">Separate with commas</p>
              </div>

              {/* Meta Description */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label htmlFor="metaDescription" className="block text-sm font-semibold text-slate-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={postData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO description for search engines..."
                  className="w-full h-20 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
                />
                <p className="mt-2 text-xs text-slate-500">{postData.metaDescription.length} / 160 characters</p>
              </div>

              {/* Publish Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label htmlFor="publishDate" className="block text-sm font-semibold text-slate-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={postData.publishDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="mt-4">
                  <label htmlFor="author" className="block text-sm font-semibold text-slate-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={postData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Social Sharing */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Social Sharing</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <span>📘</span>
                    <span>Share on Facebook</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    <span>🐦</span>
                    <span>Share on Twitter</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <span>💼</span>
                    <span>Share on LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              {/* Preview Header */}
              <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-4">
                <p className="text-sm font-semibold text-emerald-700">📄 Post Preview</p>
              </div>

              {/* Preview Content */}
              <article className="p-8 lg:p-12">
                {/* Featured Image */}
                {postData.featuredImage && (
                  <div className="mb-8 -mx-8 lg:-mx-12">
                    <img 
                      src={postData.featuredImage} 
                      alt={postData.title} 
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                    {postData.category}
                  </span>
                  <span>{postData.author}</span>
                  <span>•</span>
                  <span>{new Date(postData.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {postData.title || 'Your Post Title Here'}
                </h1>

                {/* Excerpt */}
                {postData.excerpt && (
                  <p className="text-xl text-slate-600 mb-8 italic border-l-4 border-emerald-500 pl-6">
                    {postData.excerpt}
                  </p>
                )}

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: postData.content ? `<p class="mb-4">${renderContent(postData.content)}</p>` : '<p class="text-slate-400">Start writing to see your content here...</p>'
                  }}
                />

                {/* Tags */}
                {postData.keywords && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {postData.keywords.split(',').map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share Buttons */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">Share this post:</h3>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
                      <span>🐦</span>
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm">
                      <span>💼</span>
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

