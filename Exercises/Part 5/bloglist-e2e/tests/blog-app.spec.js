const { beforeEach, describe, test, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

// Exerices 5.17
describe('Blog app', () => {

  const blog = {
    title: 'a new blog created by playwright',
    author: 'playwright',
    url: 'www.testurl.com'
  }

  const blog2 = {
    title: 'a new blog created by playwright with likes 2',
    author: 'playwright',
    url: 'www.testurl.com'
  }

  const blog3 = {
    title: 'a new blog created by playwright with likes 3',
    author: 'playwright',
    url: 'www.testurl.com'
  }

  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Posen',
        username: 'chensa992',
        password: 'testtest'
      }
    })

    await page.goto('/')
  })
  // Exercises 5.18
  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })


  describe('log in', () => {
    test('log with right password', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      const element = await page.getByText('blogs')
      await expect(element).toBeVisible()
    })

    test('log with wrong password', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      const element = await page.getByText('invalid username or password')
      await expect(element).toBeVisible()
    })
  })

  describe('When logged in', async () => {

    // Exercises  5.19
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, blog.title, blog.author, blog.url)

      const element = await page.getByText(`${blog.title} ${blog.author}`)
      await expect(element).toBeVisible()
    })

    // Exercises  5.20
    test('blog can be liked', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, blog.title, blog.author, blog.url)

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    // Exercises  5.21
    test('the user who added the blog can delete the blog.', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, blog)

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      page.on('dialog', async dialog => {
        await dialog.accept()
      });
    })

    // Exercises  5.22
    test('only the user who added the blog sees the delete button', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, blog)

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'chensa992', 'testtest')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    // Exercises  5.23
    test.only('blogs are arranged in the order according to the likes, the blog with the most likes first', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, blog)
      await createBlog(page, blog2)
      await createBlog(page, blog3)

      const firstBlogElement = await page.getByText(`${blog.title} ${blog.author}`)
      await firstBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(firstBlogElement.getByRole('button', { name: 'like' })).toBeVisible()

      const secondBlogElement = await page.getByText(`${blog2.title} ${blog2.author}`)
      await secondBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(secondBlogElement.getByRole('button', { name: 'like' })).toBeVisible()
      const likeButtonOfsecond = secondBlogElement.getByRole('button', { name: 'like' })
      await likeButtonOfsecond.click()
      await likeButtonOfsecond.click()
      await expect(secondBlogElement.getByText('likes 2')).toBeVisible()

      const thirdBlogElement = await page.getByText(`${blog3.title} ${blog3.author}`)
      await thirdBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(thirdBlogElement.getByRole('button', { name: 'like' })).toBeVisible()
      const likeButtonOfThird = thirdBlogElement.getByRole('button', { name: 'like' })
      await likeButtonOfThird.click()
      await likeButtonOfThird.click()
      await likeButtonOfThird.click()
      await expect(thirdBlogElement.getByText('likes 3')).toBeVisible()

      const blogElements = await page.getByTestId('blog').all();
      await expect(blogElements[0].getByText(`${blog3.title} ${blog3.author}`)).toBeVisible()
      await expect(blogElements[1].getByText(`${blog2.title} ${blog2.author}`)).toBeVisible()
      await expect(blogElements[2].getByText(`${blog.title} ${blog.author}`)).toBeVisible()


      // const thirdBlogElement = await page.getByText(`${blog3.title} ${blog3.author}`).locator('..')
      // await thirdBlogElement.getByRole('button', { name: 'view' }).click()
      // await expect(thirdBlogElement.getByText('like 0')).toBeVisible()

      // await page.getByRole('button' , {name: 'view'}).click()
      // await expect(page.getByRole('button' , {name: 'remove'})).toBeVisible()

      // await page.getByRole('button' , {name: 'logout'}).click()
      // await loginWith(page, 'chensa992', 'testtest')
      // await page.getByRole('button' , {name: 'view'}).click()
      // await expect(page.getByRole('button' , {name: 'remove'})).not.toBeVisible()
    })
  })
})