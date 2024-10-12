const { test, describe, expect, beforeEach, waitFor } = require('@playwright/test')
const { loginWith, createBlog, createUser, deleteBlog, addLikes } = require('./helper')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'Asra Tunio', 'test', 'test')
    await createUser(request, 'Bilal', 'bilal', 'bilal')
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Blog Application')).toBeVisible()
  })


  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'test', 'test')
    await expect(page.getByText('Asra Tunio logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'a blog created by playwright',
        author: 'Asra Tunio',
        url: 'test.com'
      }
      await createBlog(page, blog)
      await expect(page.getByText('a blog created by playwright').first()).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        const blog = {
          title: 'another blog created by playwright',
          author: 'Asra Tunio',
          url: 'test2.com'
        }
        await createBlog(page, blog)
      })
  
      test('likes can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        await deleteBlog(page)
        const successDiv = await page.locator('.success')
        await expect(successDiv).toContainText('Blog deleted')
        await expect(page.getByText('another blog created by playwright')).not.toBeVisible()
      })

      test('blog cannot be deleted by another user', async ({ page }) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'bilal', 'bilal')
        await deleteBlog(page)
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Blog could not be deleted')
        await expect(page.getByText('another blog created by playwright')).toBeVisible()
      })
    })

    test('likes are in order', async ({ page }) => {

      // create the blogs
      const blogs = [{
        title: 'test blog 1',
        author: 'Asra Tunio',
        url: 'test.com'
      },
       {
        title: 'test blog 2',
        author: 'Asra Tunio',
        url: 'test.com'
      },
      {
        title: 'test blog 3',
        author: 'Asra Tunio',
        url: 'test.com'
      }]
      for (const blog of blogs) {
        await createBlog(page, blog)
      }

      // add likes
      let numOfLikes = 1
      for (const blog of blogs) {
        await addLikes(page, blog.title, numOfLikes)
        numOfLikes++
      }

      // verify likes are in order
      const topBlog = await page.getByText('test blog').first()
      const bottomBlog = await page.getByText('test blog').last()
      await expect(topBlog).toContainText('likes 3')
      await expect(bottomBlog).toContainText('likes 1')

    })

  }) 
  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'test', 'wrong')
  
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong username or password.')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('Asra Tunio logged in')).not.toBeVisible()
  })
})
