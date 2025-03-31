/**
 * Utility functions for the X about Y application
 */

import type { XValue, YValue } from '../types';
import xValues from '../data/x-values.json';
import yValues from '../data/y-values.json';

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

/**
 * Find X value by ID
 */
export function getXValueById(id: string): XValue | undefined {
  const xValue = xValues.find((x) => x.id === id);
  if (xValue) {
    // Ensure emoji is properly handled
    console.log("Raw X emoji:", xValue.emoji);
    xValue.emoji = xValue.emoji || ""; // Ensure it's not undefined
  }
  return xValue;
}

/**
 * Find Y value by ID
 */
export function getYValueById(id: string): YValue | undefined {
  const yValue = yValues.find((y) => y.id === id);
  if (yValue) {
    // Ensure emoji is properly handled
    console.log("Raw Y emoji:", yValue.emoji);
    yValue.emoji = yValue.emoji || ""; // Ensure it's not undefined
  }
  return yValue;
}

/**
 * Get random X value
 */
export function getRandomXValue(): XValue {
  const index = Math.floor(Math.random() * xValues.length);
  return xValues[index];
}

/**
 * Get random Y value
 */
export function getRandomYValue(): YValue {
  const index = Math.floor(Math.random() * yValues.length);
  return yValues[index];
}

/**
 * Get all X values
 */
export function getAllXValues(): XValue[] {
  return xValues;
}

/**
 * Get all Y values
 */
export function getAllYValues(): YValue[] {
  return yValues;
}

/**
 * Generate storage key for KV store
 */
export function generatePostKey(xId: string, yId: string): string {
  return `post:${xId}:${yId}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Generate permalink for a post
 */
export function generatePermalink(xId: string, yId: string): string {
  return `/post/${xId}/${yId}`;
}

/**
 * Truncate text to a specific length with ellipsis
 */
export function truncate(text: string, length = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
