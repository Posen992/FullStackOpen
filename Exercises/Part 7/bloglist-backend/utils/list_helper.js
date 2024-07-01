const lodash = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum , blog) => {
		return sum + blog.likes
	}
	return blogs.reduce(reducer,0)
}

const favoriteBlog = blogs => {
	const reducer = ( maxBlog, currentBlog ) => {
		return maxBlog.likes > currentBlog.likes?maxBlog:currentBlog
	}

	return blogs.reduce(reducer,blogs[0])
}

const mostBlogs = blogs => {
	const groups = lodash.groupBy(blogs,'author')

	const maxAuthor = Object.keys(groups).reduce((max, item) => {
		return groups[max].length > groups[item].length?max:item
	},Object.keys(groups)[0])

	return { 'author' : maxAuthor, 'blogs' : groups[maxAuthor].length }
}

const mostLikes = blogs => {
	const groups = lodash.groupBy(blogs, 'author')

	const maxAuthor = Object.keys(groups).reduce((max, item) => {
		return totalLikes(groups[max]) > totalLikes(groups[item])?max:item
	},Object.keys(groups)[0])

	return { 'author' : maxAuthor, 'likes' : totalLikes(groups[maxAuthor]) }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}