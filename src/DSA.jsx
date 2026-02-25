import { useState, useEffect } from "react";

// LeetCode difficulty colours
const LC = {
  Easy:   { bg:"#052e16", text:"#4ade80", border:"#166534", dot:"#4ade80" },
  Medium: { bg:"#1c1500", text:"#fbbf24", border:"#92400e", dot:"#fbbf24" },
  Hard:   { bg:"#250010", text:"#f87171", border:"#9f1239", dot:"#f87171" },
};

const TOPICS = [
  // ─────────────────────────────────────────────
  {
    id:"arrays", label:"Arrays", icon:"▦",
    title:"Arrays & Hashing",
    desc:"The foundation. Master these patterns and you'll see them everywhere else.",
    accent:"#e8c547", dim:"#17120a", glow:"rgba(232,197,71,0.1)",
    problems:[
      { id:"a1",  num:1,   slug:"two-sum",                              title:"Two Sum",                           diff:"Easy",   time:"15m", tag:"HashMap",
        concept:"Given an integer array and a target, return indices of the two numbers that add up to target. Exactly one solution, can't reuse same element.",
        insight:"For each element x, check if (target − x) already exists in a HashMap. Insert x after checking — this handles the 'same index' constraint in one pass.",
        implement:"One-pass HashMap: map stores value→index. For each i: if (target-nums[i]) in map, return [map.get(target-nums[i]), i]. Else map.put(nums[i], i).",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"nums=[2,7,11,15], target=9",e:"[0,1]",n:"2+7=9"},{i:"nums=[3,2,4], target=6",e:"[1,2]",n:"2+4=6"},{i:"nums=[3,3], target=6",e:"[0,1]",n:"Duplicate values"}] },
      { id:"a2",  num:217, slug:"contains-duplicate",                   title:"Contains Duplicate",                diff:"Easy",   time:"10m", tag:"HashSet",
        concept:"Given an integer array, return true if any value appears at least twice.",
        insight:"HashSet membership check is O(1). If you've seen a number before, you have your answer immediately. No need to process the whole array.",
        implement:"Iterate: if nums[i] in set → return true. Else add to set. Return false after loop.",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"[1,2,3,1]",e:"true",n:"1 appears twice"},{i:"[1,2,3,4]",e:"false",n:"All unique"},{i:"[1,1,1,3,3,4,3,2,4,2]",e:"true",n:"Multiple dupes"}] },
      { id:"a3",  num:238, slug:"product-of-array-except-self",         title:"Product of Array Except Self",      diff:"Medium", time:"30m", tag:"Prefix Products",
        concept:"Return output[i] = product of all elements except nums[i]. No division. O(n) time, O(1) extra space.",
        insight:"output[i] = (product of all to the left) × (product of all to the right). Two passes: fill left products first, then multiply in right products on the fly.",
        implement:"Pass 1 L→R: output[i] = product of nums[0..i-1], start output[0]=1. Pass 2 R→L: running right=1, output[i]*=right, right*=nums[i].",
        complexity:"O(n) time · O(1) extra space",
        tests:[{i:"[1,2,3,4]",e:"[24,12,8,6]",n:"Standard"},{i:"[-1,1,0,-3,3]",e:"[0,0,9,0,0]",n:"Zero in array"},{i:"[0,0]",e:"[0,0]",n:"Two zeros"}] },
      { id:"a4",  num:53,  slug:"maximum-subarray",                     title:"Maximum Subarray",                  diff:"Medium", time:"20m", tag:"Kadane's",
        concept:"Find the contiguous subarray with the largest sum (at least one element).",
        insight:"Kadane's: if the running sum goes negative, it only hurts future sums — reset it. At each position: curSum = max(nums[i], curSum + nums[i]).",
        implement:"curSum=nums[0], maxSum=nums[0]. For i=1..n-1: curSum=max(nums[i], curSum+nums[i]); maxSum=max(maxSum,curSum).",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"[-2,1,-3,4,-1,2,1,-5,4]",e:"6",n:"[4,-1,2,1]"},{i:"[1]",e:"1",n:"Single element"},{i:"[-1,-2,-3]",e:"-1",n:"All negative → least negative"}] },
      { id:"a5",  num:242, slug:"valid-anagram",                        title:"Valid Anagram",                     diff:"Easy",   time:"10m", tag:"Frequency Count",
        concept:"Given strings s and t, return true if t is an anagram of s (same characters, same frequencies).",
        insight:"Two strings are anagrams iff their character frequency maps are identical. Count one, decrement with the other, check all zeros.",
        implement:"If lengths differ → false. int[26] count. Increment for s chars, decrement for t chars. If any count ≠ 0 → false.",
        complexity:"O(n) time · O(1) space (fixed 26-char array)",
        tests:[{i:'s="anagram", t="nagaram"',e:"true",n:"Rearranged"},{i:'s="rat", t="car"',e:"false",n:"Different chars"},{i:'s="a", t="ab"',e:"false",n:"Different lengths"}] },
      { id:"a6",  num:49,  slug:"group-anagrams",                       title:"Group Anagrams",                    diff:"Medium", time:"20m", tag:"HashMap",
        concept:"Group an array of strings so anagrams are together. Return list of groups.",
        insight:"All anagrams share the same sorted form — use it as a HashMap key. Alternatively, use a frequency-tuple key to avoid sorting.",
        implement:"For each word: sort it → key. Map<String,List<String>>. Return map.values().",
        complexity:"O(n·k log k) time · O(n·k) space",
        tests:[{i:'["eat","tea","tan","ate","nat","bat"]',e:'[["bat"],["nat","tan"],["ate","eat","tea"]]',n:"3 groups"},{i:'[""]',e:'[[""]]',n:"Single empty"},{i:'["a"]',e:'[["a"]]',n:"Single char"}] },
      { id:"a7",  num:347, slug:"top-k-frequent-elements",              title:"Top K Frequent Elements",            diff:"Medium", time:"25m", tag:"Bucket Sort",
        concept:"Return the k most frequent elements. O(n) time required.",
        insight:"Bucket sort: frequency is bounded by n, so create n+1 frequency buckets. O(n) beats the O(n log n) heap approach.",
        implement:"Count frequencies. Array of lists: bucket[freq] gets the number. Collect from bucket[n] downward until k elements gathered.",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"[1,1,1,2,2,3], k=2",e:"[1,2]",n:"1 appears 3x, 2 appears 2x"},{i:"[1], k=1",e:"[1]",n:"Single"},{i:"[4,1,1,2,2,3], k=2",e:"[1,2]",n:"Tied frequencies"}] },
      { id:"a8",  num:128, slug:"longest-consecutive-sequence",         title:"Longest Consecutive Sequence",       diff:"Medium", time:"30m", tag:"HashSet",
        concept:"Find length of the longest sequence of consecutive integers. O(n) time required.",
        insight:"Only start counting from the beginning of a sequence (when num−1 is NOT in the set). This avoids reprocessing and makes it O(n).",
        implement:"Build HashSet. For each num: if num-1 not in set → count forward (num, num+1, ...) while in set. Track max count.",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"[100,4,200,1,3,2]",e:"4",n:"[1,2,3,4]"},{i:"[0,3,7,2,5,8,4,6,0,1]",e:"9",n:"[0..8]"},{i:"[]",e:"0",n:"Empty"}] },
      { id:"a9",  num:271, slug:"encode-and-decode-strings",            title:"Encode and Decode Strings",          diff:"Medium", time:"25m", tag:"Design",
        concept:"Design encode(List<String>)→String and decode(String)→List<String>. Handle any characters including delimiters.",
        insight:"Use length-prefixed encoding: prepend each string's length and a separator like '#'. Decode by reading the length, jumping past '#', extracting exactly that many chars.",
        implement:'Encode: for each s, append len(s)+"#"+s. Decode: scan for "#", read length before it, extract next length chars, advance pointer.',
        complexity:"O(n) encode and decode · O(1) extra space",
        tests:[{i:'["lint","code","love","you"]',e:"Same after encode→decode",n:"Standard"},{i:'[""]',e:'[""]',n:"Empty string"},{i:'["hello#world","foo"]',e:"Same",n:"Delimiter in string"}] },
      { id:"a10", num:42,  slug:"trapping-rain-water",                  title:"Trapping Rain Water",                diff:"Hard",   time:"40m", tag:"Two Pointers",
        concept:"Given histogram bar heights, compute how much water can be trapped after raining.",
        insight:"Water at bar i = min(maxLeft, maxRight) − height[i]. Two-pointer: if maxL ≤ maxR, left answer is fully determined — process it and move left pointer in.",
        implement:"lo=0, hi=n-1, maxL=maxR=0, res=0. While lo<hi: if height[lo]≤height[hi]: maxL=max(maxL,h[lo]); res+=maxL-h[lo]; lo++. Else mirror for hi.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"[0,1,0,2,1,0,1,3,1,2,1,2]",e:"6",n:"Classic"},{i:"[4,2,0,3,2,5]",e:"9",n:"Large walls"},{i:"[3,0,2,0,4]",e:"7",n:"Multiple valleys"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"sliding", label:"Sliding Window", icon:"⬌",
    title:"Sliding Window",
    desc:"A subarray pattern that eliminates redundant computation by reusing prior work.",
    accent:"#67e8f9", dim:"#001a1e", glow:"rgba(103,232,249,0.1)",
    problems:[
      { id:"sw1", num:121, slug:"best-time-to-buy-and-sell-stock",      title:"Best Time to Buy and Sell Stock",    diff:"Easy",   time:"15m", tag:"One Pass",
        concept:"Given prices[], choose a day to buy and a later day to sell to maximise profit. Return max profit or 0.",
        insight:"Track the minimum price seen so far. At each day, profit = price − minSoFar. Update both minSoFar and maxProfit as you go.",
        implement:"minPrice=∞, maxProfit=0. For each price: maxProfit=max(maxProfit, price-minPrice); minPrice=min(minPrice, price).",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"[7,1,5,3,6,4]",e:"5",n:"Buy at 1, sell at 6"},{i:"[7,6,4,3,1]",e:"0",n:"Strictly decreasing — don't trade"},{i:"[2,4,1]",e:"2",n:"Buy at 2, sell at 4"}] },
      { id:"sw2", num:3,   slug:"longest-substring-without-repeating-characters", title:"Longest Substring Without Repeating Characters", diff:"Medium", time:"25m", tag:"Sliding Window",
        concept:"Find the length of the longest substring without repeating characters.",
        insight:"Sliding window with a HashSet. When a duplicate is found, shrink the window from the left until the duplicate is removed. The window always contains unique characters.",
        implement:"lo=0, set={}. For each hi: while s[hi] in set: remove s[lo], lo++. Add s[hi] to set. maxLen=max(maxLen, hi-lo+1).",
        complexity:"O(n) time · O(min(n,alphabet)) space",
        tests:[{i:'"abcabcbb"',e:"3",n:'"abc"'},{i:'"bbbbb"',e:"1",n:'"b"'},{i:'"pwwkew"',e:"3",n:'"wke"'}] },
      { id:"sw3", num:424, slug:"longest-repeating-character-replacement",title:"Longest Repeating Character Replacement",diff:"Medium", time:"30m", tag:"Sliding Window",
        concept:"Given string s and integer k, find the longest substring you can get if you can replace at most k characters to make all chars the same.",
        insight:"windowLen − maxFreqInWindow ≤ k means the window is valid (replace all non-max-freq chars). When invalid, slide left. maxFreq never needs to decrease.",
        implement:"freq[26], lo=0, maxFreq=0. For each hi: update freq, maxFreq. If (hi-lo+1)-maxFreq > k: freq[s[lo]]--; lo++. maxLen=hi-lo+1.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:'"ABAB", k=2',e:"4",n:"Replace 2 A→B or B→A"},{i:'"AABABBA", k=1',e:"4",n:'"AABA" or "ABBA"'},{i:'"AAAA", k=0',e:"4",n:"Already all same"}] },
      { id:"sw4", num:567, slug:"permutation-in-string",                title:"Permutation in String",               diff:"Medium", time:"25m", tag:"Fixed Window",
        concept:"Given s1 and s2, return true if any permutation of s1 is a substring of s2.",
        insight:"Fixed-size window of length len(s1). Maintain character frequency counts. Slide the window, updating counts in O(1). Match when all 26 counts are zero.",
        implement:"int[26] need (s1 counts), have (window counts). matches=0 (chars where need[c]==have[c]). Slide: add right char, remove left char, update matches. Return true if matches==26.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:'s1="ab", s2="eidbaooo"',e:"true",n:'"ba" at index 3'},{i:'s1="ab", s2="eidboaoo"',e:"false",n:"No permutation"},{i:'s1="adc", s2="dcda"',e:"true",n:'"cda" is permutation of adc"'}] },
      { id:"sw5", num:76,  slug:"minimum-window-substring",             title:"Minimum Window Substring",           diff:"Hard",   time:"45m", tag:"Sliding Window",
        concept:"Given strings s and t, find the minimum window in s that contains all characters of t (including duplicates). Return empty string if impossible.",
        insight:"Expand right until window is valid (contains all t chars), then shrink from left as much as possible, recording the minimum. Expand again. The 'have vs need' counter avoids scanning the entire frequency array each step.",
        implement:"need map for t. have=0, need=len(unique t chars). Expand r: if freq match → have++. While have==need: update min window; shrink l. Return best window.",
        complexity:"O(n+m) time · O(n+m) space",
        tests:[{i:'s="ADOBECODEBANC", t="ABC"',e:'"BANC"',n:"Smallest window"},{i:'s="a", t="a"',e:'"a"',n:"Single char match"},{i:'s="a", t="aa"',e:'""',n:"t needs more than s has"}] },
      { id:"sw6", num:239, slug:"sliding-window-maximum",               title:"Sliding Window Maximum",              diff:"Hard",   time:"40m", tag:"Monotonic Deque",
        concept:"Return the maximum element in each window of size k as it slides across the array.",
        insight:"Monotonic decreasing deque of indices. When adding i: pop all back elements with value ≤ nums[i] — they can never be the maximum. Pop front when it falls outside the window.",
        implement:"ArrayDeque<Integer> dq. For each i: while dq non-empty and nums[dq.peekLast()]≤nums[i]: pollLast. addLast(i). If dq.peekFirst()==i-k: pollFirst. If i≥k-1: res[i-k+1]=nums[dq.peekFirst()].",
        complexity:"O(n) time · O(k) space",
        tests:[{i:"[1,3,-1,-3,5,3,6,7], k=3",e:"[3,3,5,5,6,7]",n:"Classic"},{i:"[1], k=1",e:"[1]",n:"Single"},{i:"[9,11], k=2",e:"[11]",n:"One window"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"linked", label:"Linked Lists", icon:"⬦",
    title:"Linked Lists",
    desc:"Pointer manipulation under pressure. Visualise nodes changing in real time.",
    accent:"#6ee7b7", dim:"#001a10", glow:"rgba(110,231,183,0.1)",
    problems:[
      { id:"l1",  num:206, slug:"reverse-linked-list",                  title:"Reverse Linked List",                diff:"Easy",   time:"15m", tag:"Pointer Rewiring",
        concept:"Reverse a singly linked list in-place. Return the new head. Implement both iteratively and recursively.",
        insight:"Three variables: prev, curr, next. Save next BEFORE overwriting curr.next. Recursive: reverse the tail, fix the back pointer, set curr.next=null.",
        implement:"Iterative: prev=null. Loop: next=curr.next; curr.next=prev; prev=curr; curr=next. Return prev. Recursive: head.next.next=head; head.next=null; return newHead.",
        complexity:"O(n) time · O(1) iter / O(n) recursive",
        tests:[{i:"1→2→3→4→5",e:"5→4→3→2→1",n:"Standard"},{i:"1→2",e:"2→1",n:"Two nodes"},{i:"1",e:"1",n:"Single node"}] },
      { id:"l2",  num:21,  slug:"merge-two-sorted-lists",               title:"Merge Two Sorted Lists",             diff:"Easy",   time:"20m", tag:"Merging",
        concept:"Merge two sorted linked lists into one sorted list in-place. Return the head.",
        insight:"Dummy sentinel node avoids special-casing the head. At each step, pick the smaller head from either list. Append the remaining non-empty list at the end.",
        implement:"dummy=new Node(-1), curr=dummy. While both non-null: attach smaller, advance that pointer. curr.next = remaining list. Return dummy.next.",
        complexity:"O(n+m) time · O(1) space",
        tests:[{i:"[1,2,4] + [1,3,4]",e:"[1,1,2,3,4,4]",n:"Interleaved"},{i:"[] + [0]",e:"[0]",n:"One empty"},{i:"[] + []",e:"[]",n:"Both empty"}] },
      { id:"l3",  num:143, slug:"reorder-list",                         title:"Reorder List",                       diff:"Medium", time:"35m", tag:"Multi-Step",
        concept:"L0→L1→…→Ln → L0→Ln→L1→Ln-1→… in-place. Must modify the list directly.",
        insight:"Three subroutines composed: (1) find middle, (2) reverse second half, (3) merge two halves alternately. Recognising known building blocks inside a new problem is a core interview skill.",
        implement:"1. slow/fast pointer → middle. 2. Reverse from middle.next, set middle.next=null. 3. Interleave: p1=head, p2=reversed. Alternate links carefully.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"1→2→3→4",e:"1→4→2→3",n:"Even"},{i:"1→2→3→4→5",e:"1→5→2→4→3",n:"Odd"},{i:"1→2",e:"1→2",n:"Two nodes"}] },
      { id:"l4",  num:19,  slug:"remove-nth-node-from-end-of-list",     title:"Remove Nth Node From End of List",   diff:"Medium", time:"25m", tag:"Two Pointers",
        concept:"Remove the nth node from the end of the list in one pass. Return the head.",
        insight:"Two pointers: advance fast pointer n steps ahead. Then move both until fast.next is null. slow.next is the node to remove. Dummy head handles removing the first node.",
        implement:"dummy→head. fast=slow=dummy. Advance fast n+1 times. Move both until fast is null. slow.next=slow.next.next. Return dummy.next.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"[1,2,3,4,5], n=2",e:"[1,2,3,5]",n:"Remove 4"},{i:"[1], n=1",e:"[]",n:"Remove only node"},{i:"[1,2], n=1",e:"[1]",n:"Remove last"}] },
      { id:"l5",  num:141, slug:"linked-list-cycle",                    title:"Linked List Cycle",                  diff:"Easy",   time:"15m", tag:"Floyd's",
        concept:"Determine if a linked list has a cycle.",
        insight:"Floyd's Tortoise and Hare: slow moves 1, fast moves 2. If a cycle exists, they will eventually meet. If fast reaches null, there's no cycle.",
        implement:"slow=fast=head. While fast!=null && fast.next!=null: slow=slow.next; fast=fast.next.next. If slow==fast → cycle. Return false.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"3→2→0→-4, tail→node[1]",e:"true",n:"Cycle back to index 1"},{i:"1→2, tail→node[0]",e:"true",n:"Two-node cycle"},{i:"1, no tail",e:"false",n:"No cycle"}] },
      { id:"l6",  num:142, slug:"linked-list-cycle-ii",                 title:"Linked List Cycle II",               diff:"Medium", time:"30m", tag:"Floyd's",
        concept:"Given a linked list with a cycle, return the node where the cycle begins.",
        insight:"After Floyd's meeting point, reset one pointer to head. Move both at speed 1. They meet exactly at the cycle entry — provable mathematically from the distances.",
        implement:"Phase 1: find meeting point (standard Floyd's). Phase 2: reset ptr1=head. Move ptr1 and ptr2 (from meeting) both by 1 until equal → that's the entry node.",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"3→2→0→-4, tail→node[1]",e:"node(val=2)",n:"Cycle starts at index 1"},{i:"1→2, tail→node[0]",e:"node(val=1)",n:"Whole list is cycle"},{i:"1, no cycle",e:"null",n:"No cycle"}] },
      { id:"l7",  num:146, slug:"lru-cache",                            title:"LRU Cache",                          diff:"Medium", time:"55m", tag:"HashMap+DLL",
        concept:"O(1) get(key) and put(key,value). When capacity is exceeded, evict the Least Recently Used item. get() counts as a use.",
        insight:"HashMap for O(1) lookup + Doubly Linked List for O(1) recency ordering. Dummy head (MRU end) and tail (LRU end) eliminate edge cases. Every operation must sync BOTH structures.",
        implement:"Node has key,val,prev,next. Map: key→node. get: if exists, move to front (after dummy head). put: if exists update+move; else create+prepend. If over capacity, evict tail.prev and remove from map.",
        complexity:"O(1) get and put · O(capacity) space",
        tests:[{i:"cap=2; put(1,1); put(2,2); get(1)→1; put(3,3); get(2)→-1; get(3)→3",e:"As described",n:"2 evicted when 3 added"},{i:"cap=1; put(2,1); get(2)→1; put(3,2); get(2)→-1; get(3)→2",e:"As described",n:"Capacity-1 eviction"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"stacks", label:"Stacks & Queues", icon:"⬚",
    title:"Stacks & Queues",
    desc:"When to push, when to pop. Monotonic stacks solve deceptively hard problems elegantly.",
    accent:"#a78bfa", dim:"#0d0820", glow:"rgba(167,139,250,0.1)",
    problems:[
      { id:"s1",  num:20,  slug:"valid-parentheses",                    title:"Valid Parentheses",                  diff:"Easy",   time:"15m", tag:"Stack",
        concept:"Given a string of '(', ')', '{', '}', '[', ']', determine if it is valid: openers must close in correct order.",
        insight:"Push openers. For every closer, the stack top must be the matching opener — anything else is immediately invalid. Two edge cases: closer with empty stack, non-empty at end.",
        implement:"Map closer→opener. Iterate: if opener push. If closer: if stack empty or top≠expected opener → false. Else pop. Return stack.isEmpty().",
        complexity:"O(n) time · O(n) space",
        tests:[{i:'"()"',e:"true"},{i:'"()[]{}"',e:"true"},{i:'"(]"',e:"false",n:"Mismatched"},{i:'"([)]"',e:"false",n:"Interleaved invalid"}] },
      { id:"s2",  num:155, slug:"min-stack",                            title:"Min Stack",                          diff:"Medium", time:"20m", tag:"Auxiliary Stack",
        concept:"Stack with push, pop, top, getMin — all O(1).",
        insight:"Parallel min-stack tracks the running minimum after every push. When you pop the main stack, pop the min-stack too — the min 'un-winds' back to its previous state.",
        implement:"Two stacks. push(val): main.push(val); minStack.push(min(val, minStack.isEmpty()?val:minStack.peek())). pop: both pop. getMin: minStack.peek().",
        complexity:"O(1) all ops · O(n) space",
        tests:[{i:"push(-2),push(0),push(-3),getMin→-3,pop,top→0,getMin→-2",e:"As described"},{i:"push(5),push(3),push(7),getMin→3,pop,getMin→3",e:"As described",n:"Pop 7, min stays 3"}] },
      { id:"s3",  num:150, slug:"evaluate-reverse-polish-notation",     title:"Evaluate Reverse Polish Notation",   diff:"Medium", time:"25m", tag:"Stack",
        concept:"Evaluate an expression in Reverse Polish Notation. Valid operators: +, -, *, /. Integer division truncates toward zero.",
        insight:"Stack-based: push numbers. On operator, pop two operands, apply operator, push result. The second pop is the LEFT operand (order matters for - and /).",
        implement:"Stack<Integer>. For each token: if number, push. Else: b=pop, a=pop, push(a op b). Return stack.pop().",
        complexity:"O(n) time · O(n) space",
        tests:[{i:'["2","1","+","3","*"]',e:"9",n:"(2+1)*3"},{i:'["4","13","5","/","+"]',e:"6",n:"4+(13/5)=6"},{i:'["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',e:"22",n:"Complex expression"}] },
      { id:"s4",  num:22,  slug:"generate-parentheses",                 title:"Generate Parentheses",               diff:"Medium", time:"30m", tag:"Backtracking",
        concept:"Given n, generate all combinations of n pairs of well-formed parentheses.",
        insight:"At any point, add '(' if open count < n. Add ')' if close count < open count. This greedy constraint ensures all generated strings are valid without needing post-validation.",
        implement:"Backtrack(open, close, current): if len==2n append. If open<n: recurse with '('. If close<open: recurse with ')'.",
        complexity:"O(4^n / √n) time (Catalan number) · O(n) space",
        tests:[{i:"n=3",e:'["((()))","(()())","(())()","()(())","()()()"]',n:"5 combinations"},{i:"n=1",e:'["()"]',n:"Single pair"},{i:"n=2",e:'["(())","()()"]',n:"Two pairs"}] },
      { id:"s5",  num:739, slug:"daily-temperatures",                   title:"Daily Temperatures",                 diff:"Medium", time:"25m", tag:"Monotonic Stack",
        concept:"Given daily temperatures, return how many days until a warmer day for each day (0 if none).",
        insight:"Monotonic decreasing stack of indices. When T[i] > T[stack.top()], the top has found its warmer day. Pop it and record the distance. This is the prototype of all monotonic stack problems.",
        implement:"Stack<Integer> of indices. For each i: while !empty && T[i]>T[stack.peek()]: j=pop; ans[j]=i-j. Push i. Remaining stack → ans stays 0.",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"[73,74,75,71,69,72,76,73]",e:"[1,1,4,2,1,1,0,0]"},{i:"[30,40,50,60]",e:"[1,1,1,0]",n:"Strictly increasing"},{i:"[30,60,90]",e:"[1,1,0]"}] },
      { id:"s6",  num:853, slug:"car-fleet",                            title:"Car Fleet",                          diff:"Medium", time:"30m", tag:"Monotonic Stack",
        concept:"n cars drive to a target. Given positions[] and speeds[], find how many car fleets arrive. A faster car catching a slower one joins its fleet.",
        insight:"Sort cars by position (closest to target first). Compute time to reach target for each. If a car's time ≤ the car ahead, it joins that fleet. Stack tracks fleet leaders.",
        implement:"Sort pairs (pos, speed) by pos descending. Stack of times. For each car: time=(target-pos)/speed. If stack empty or time>stack.top() → push (new fleet). Return stack.size().",
        complexity:"O(n log n) time · O(n) space",
        tests:[{i:"target=12, pos=[10,8,0,5,3], speed=[2,4,1,1,3]",e:"3",n:"3 fleets"},{i:"target=10, pos=[3], speed=[3]",e:"1",n:"Single car"},{i:"target=100, pos=[0,2,4], speed=[4,2,1]",e:"1",n:"All merge into one fleet"}] },
      { id:"s7",  num:84,  slug:"largest-rectangle-in-histogram",       title:"Largest Rectangle in Histogram",     diff:"Hard",   time:"50m", tag:"Monotonic Stack",
        concept:"Find the area of the largest rectangle fitting entirely within a histogram.",
        insight:"For each bar, the rectangle using it as the shortest bar extends until a shorter bar blocks it on either side. Monotonic increasing stack finds both boundaries efficiently.",
        implement:"Stack of indices (increasing heights). Add sentinel 0s at both ends. When heights[i]<heights[top]: pop j; width=i-stack.top()-1; area=heights[j]*width; update max.",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"[2,1,5,6,2,3]",e:"10",n:"5×2 rectangle (bars 2,3)"},{i:"[2,4]",e:"4",n:"Single tall bar"},{i:"[1,1]",e:"2",n:"2×1"},{i:"[5]",e:"5",n:"Single bar"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"bsearch", label:"Binary Search", icon:"⊢",
    title:"Binary Search",
    desc:"Works on any monotonic predicate — not just sorted arrays.",
    accent:"#38bdf8", dim:"#001520", glow:"rgba(56,189,248,0.1)",
    problems:[
      { id:"b1",  num:704, slug:"binary-search",                        title:"Binary Search",                      diff:"Easy",   time:"15m", tag:"Classic",
        concept:"Search for a target in a sorted array. Return its index or -1.",
        insight:"lo=0, hi=n-1, while lo≤hi. Mid=(lo+hi)>>>1 (avoids overflow). If nums[mid]=target found. If <target lo=mid+1. If >target hi=mid-1.",
        implement:"Master the template and all three variants: exact match, leftmost occurrence, rightmost occurrence. These are lower_bound and upper_bound in C++ STL.",
        complexity:"O(log n) time · O(1) space",
        tests:[{i:"[-1,0,3,5,9,12], target=9",e:"4"},{i:"[-1,0,3,5,9,12], target=2",e:"-1",n:"Not present"},{i:"[5], target=5",e:"0",n:"Single element"}] },
      { id:"b2",  num:74,  slug:"search-a-2d-matrix",                  title:"Search a 2D Matrix",                 diff:"Medium", time:"20m", tag:"Binary Search",
        concept:"m×n matrix where each row is sorted and the first element of each row > last of previous. Search for a target in O(log(m×n)).",
        insight:"Treat the matrix as a flattened sorted array of m×n elements. Binary search on this virtual array: row=mid/n, col=mid%n.",
        implement:"lo=0, hi=m*n-1. mid=(lo+hi)/2. val=matrix[mid/n][mid%n]. Standard binary search comparisons.",
        complexity:"O(log(m·n)) time · O(1) space",
        tests:[{i:"[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3",e:"true"},{i:"Same matrix, target=13",e:"false"},{i:"[[1]], target=1",e:"true"}] },
      { id:"b3",  num:875, slug:"koko-eating-bananas",                  title:"Koko Eating Bananas",                diff:"Medium", time:"35m", tag:"Search on Answer",
        concept:"Koko must eat all piles in H hours. She eats at most k bananas per pile-hour. Find minimum k.",
        insight:"Parametric search: binary search on the answer (speed). canFinish(k): sum of ⌈pile/k⌉ for each pile ≤ H. Property is monotonic: if k works, k+1 also works.",
        implement:"lo=1, hi=max(piles). While lo<hi: mid=(lo+hi)/2. If canFinish(mid): hi=mid. Else lo=mid+1. Return lo.",
        complexity:"O(n log(max_pile)) time · O(1) space",
        tests:[{i:"piles=[3,6,7,11], H=8",e:"4",n:"⌈3/4⌉+⌈6/4⌉+⌈7/4⌉+⌈11/4⌉=8"},{i:"piles=[30,11,23,4,20], H=5",e:"30",n:"H=nPiles → must finish each in 1hr"},{i:"piles=[30,11,23,4,20], H=6",e:"23"}] },
      { id:"b4",  num:153, slug:"find-minimum-in-rotated-sorted-array", title:"Find Minimum in Rotated Sorted Array",diff:"Medium", time:"25m", tag:"Modified BS",
        concept:"Find the minimum element in a rotated sorted array (no duplicates) in O(log n).",
        insight:"Compare mid to hi (not lo). If nums[mid]>nums[hi], minimum is in right half. Otherwise it's at mid or left. Never exclude mid when going left.",
        implement:"lo=0, hi=n-1. While lo<hi: mid=(lo+hi)/2. If nums[mid]>nums[hi]: lo=mid+1. Else hi=mid. Return nums[lo].",
        complexity:"O(log n) time · O(1) space",
        tests:[{i:"[3,4,5,1,2]",e:"1"},{i:"[4,5,6,7,0,1,2]",e:"0"},{i:"[11,13,15,17]",e:"11",n:"Not rotated"}] },
      { id:"b5",  num:33,  slug:"search-in-rotated-sorted-array",       title:"Search in Rotated Sorted Array",     diff:"Medium", time:"30m", tag:"Modified BS",
        concept:"Search for target in a rotated sorted array (no duplicates) in O(log n). Return index or -1.",
        insight:"At every mid, one half is always sorted. Check if target falls in the sorted half — if yes, go there; else go to the other half.",
        implement:"If nums[lo]≤nums[mid] (left sorted): if lo≤target<nums[mid] go left, else right. Else (right sorted): if nums[mid]<target≤nums[hi] go right, else left.",
        complexity:"O(log n) time · O(1) space",
        tests:[{i:"[4,5,6,7,0,1,2], target=0",e:"4"},{i:"[4,5,6,7,0,1,2], target=3",e:"-1"},{i:"[1], target=0",e:"-1"},{i:"[3,1], target=1",e:"1"}] },
      { id:"b6",  num:981, slug:"time-based-key-value-store",           title:"Time Based Key-Value Store",         diff:"Medium", time:"30m", tag:"Binary Search",
        concept:"Design a data structure: set(key, value, timestamp) and get(key, timestamp) → value with the largest timestamp ≤ given timestamp.",
        insight:"For each key, store (timestamp, value) pairs in insertion order (timestamps are strictly increasing). get() binary searches for the largest timestamp ≤ target.",
        implement:"Map<String, List<int[]{ts,val}>>. set: append. get: binary search in the list — find largest ts ≤ timestamp. Return '' if none found.",
        complexity:"O(log n) get · O(1) set · O(n) space",
        tests:[{i:'set("foo","bar",1); get("foo",1)→"bar"; get("foo",3)→"bar"; set("foo","bar2",4); get("foo",4)→"bar2"; get("foo",5)→"bar2"',e:"As described"},{i:'get("notexist",1)→""',e:'""',n:"Key not found"}] },
      { id:"b7",  num:4,   slug:"median-of-two-sorted-arrays",          title:"Median of Two Sorted Arrays",        diff:"Hard",   time:"60m", tag:"Binary Search",
        concept:"Find the median of two sorted arrays in O(log(min(m,n))).",
        insight:"Binary search on the partition of the smaller array. Find split where max(left halves) ≤ min(right halves). Handle boundary with ±∞ sentinels.",
        implement:"Always search smaller array. Partition i of A → partition j=(m+n+1)/2-i of B. Valid if A[i-1]≤B[j] and B[j-1]≤A[i]. Adjust lo/hi otherwise.",
        complexity:"O(log(min(m,n))) time · O(1) space",
        tests:[{i:"[1,3], [2]",e:"2.0"},{i:"[1,2], [3,4]",e:"2.5"},{i:"[], [1]",e:"1.0"},{i:"[2], []",e:"2.0"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"trees", label:"Trees & BST", icon:"⌥",
    title:"Trees & Binary Search Trees",
    desc:"The recursive structure of trees is the training ground for recursive thinking.",
    accent:"#fb923c", dim:"#1a0800", glow:"rgba(251,146,60,0.1)",
    problems:[
      { id:"t1",  num:226, slug:"invert-binary-tree",                   title:"Invert Binary Tree",                 diff:"Easy",   time:"15m", tag:"DFS",
        concept:"Invert a binary tree (mirror it left-to-right). Return the root.",
        insight:"Swap left and right children at every node. The order (pre/post-order) doesn't matter — both work. Recursive: invert subtrees first (or after swap, both valid).",
        implement:"If node is null return null. Swap node.left and node.right. Recurse on both. Return node.",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[4,2,7,1,3,6,9]",e:"[4,7,2,9,6,3,1]"},{i:"[2,1,3]",e:"[2,3,1]"},{i:"[]",e:"[]"}] },
      { id:"t2",  num:104, slug:"maximum-depth-of-binary-tree",         title:"Maximum Depth of Binary Tree",       diff:"Easy",   time:"15m", tag:"DFS",
        concept:"Find the maximum depth (root-to-leaf node count on the longest path).",
        insight:"Answer = 1 + max(depth(left), depth(right)). Base case: null = 0. This template — solve children, combine, add 1 — underlies diameter, balanced, path sum, and many more.",
        implement:"return node==null ? 0 : 1+Math.max(maxDepth(node.left), maxDepth(node.right))",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[3,9,20,null,null,15,7]",e:"3"},{i:"[1,null,2]",e:"2"},{i:"[]",e:"0"}] },
      { id:"t3",  num:543, slug:"diameter-of-binary-tree",              title:"Diameter of Binary Tree",            diff:"Easy",   time:"20m", tag:"DFS",
        concept:"Find the length of the longest path between any two nodes (the path may or may not pass through root).",
        insight:"For any node, the longest path through it = depth(left) + depth(right). Compute this for every node (post-order) and track the global max. Return value = depth; side effect = update max.",
        implement:"dfs(node) returns depth. depth = 1+max(dfs(left), dfs(right)). diameter = max(diameter, dfs(left)+dfs(right)). Return depth.",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[1,2,3,4,5]",e:"3",n:"Path 4→2→1→3 or 5→2→1→3"},{i:"[1,2]",e:"1"},{i:"[1]",e:"0"}] },
      { id:"t4",  num:110, slug:"balanced-binary-tree",                 title:"Balanced Binary Tree",               diff:"Easy",   time:"20m", tag:"DFS",
        concept:"Determine if a binary tree is height-balanced: for every node, |height(left)−height(right)| ≤ 1.",
        insight:"Compute heights bottom-up. Use -1 as a sentinel for 'unbalanced'. Once -1 propagates up, short-circuit all remaining computation.",
        implement:"height(node): if null → 0. leftH=height(left); rightH=height(right). If either is -1 or |leftH-rightH|>1 → return -1. Return 1+max(leftH,rightH).",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[3,9,20,null,null,15,7]",e:"true"},{i:"[1,2,2,3,3,null,null,4,4]",e:"false",n:"Left subtree too deep"},{i:"[]",e:"true"}] },
      { id:"t5",  num:100, slug:"same-tree",                            title:"Same Tree",                          diff:"Easy",   time:"10m", tag:"DFS",
        concept:"Given two binary trees, check if they are the same (structurally identical with equal node values).",
        insight:"Recursive: two trees are the same if roots are equal AND left subtrees are the same AND right subtrees are the same. Handle null cases first.",
        implement:"if p==null && q==null → true. If either null or p.val≠q.val → false. Return isSame(p.left,q.left) && isSame(p.right,q.right).",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[1,2,3] vs [1,2,3]",e:"true"},{i:"[1,2] vs [1,null,2]",e:"false",n:"Structure differs"},{i:"[1,2,1] vs [1,1,2]",e:"false",n:"Values differ"}] },
      { id:"t6",  num:102, slug:"binary-tree-level-order-traversal",    title:"Binary Tree Level Order Traversal",  diff:"Medium", time:"20m", tag:"BFS",
        concept:"Return nodes level by level as a list of lists.",
        insight:"BFS with a queue. Before processing each level, note the queue size — process exactly that many nodes. Each node's children form the next level.",
        implement:"Queue, enqueue root. While not empty: size=queue.size(); inner loop size times: dequeue, add to current level list, enqueue children. Append level list to result.",
        complexity:"O(n) time · O(w) space (w=max width)",
        tests:[{i:"[3,9,20,null,null,15,7]",e:"[[3],[9,20],[15,7]]"},{i:"[1]",e:"[[1]]"},{i:"[]",e:"[]"}] },
      { id:"t7",  num:98,  slug:"validate-binary-search-tree",          title:"Validate Binary Search Tree",        diff:"Medium", time:"25m", tag:"BST",
        concept:"Determine if a binary tree is a valid BST (all left descendants strictly less, all right descendants strictly greater).",
        insight:"Common mistake: checking only parent-child pairs. Correct: pass (min, max) bounds down the recursion. Left subtree: upper bound = parent value. Right: lower bound = parent value.",
        implement:"validate(node, min=Long.MIN, max=Long.MAX): if null → true. If val≤min or val≥max → false. Return validate(left,min,val) && validate(right,val,max).",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[2,1,3]",e:"true"},{i:"[5,1,4,null,null,3,6]",e:"false",n:"Right child 4 < root 5"},{i:"[5,4,6,null,null,3,7]",e:"false",n:"3 is in right subtree of 5"}] },
      { id:"t8",  num:230, slug:"kth-smallest-element-in-a-bst",        title:"Kth Smallest Element in a BST",      diff:"Medium", time:"25m", tag:"BST",
        concept:"Find the kth smallest element in a BST.",
        insight:"Inorder traversal of a BST yields elements in sorted ascending order. The kth element visited during inorder is the answer.",
        implement:"Iterative inorder with stack. Count nodes visited. When count==k, return current node's value. Avoids traversing entire tree.",
        complexity:"O(h+k) time · O(h) space",
        tests:[{i:"[3,1,4,null,2], k=1",e:"1",n:"Leftmost node"},{i:"[5,3,6,2,4,null,null,1], k=3",e:"3"},{i:"[1], k=1",e:"1"}] },
      { id:"t9",  num:105, slug:"construct-binary-tree-from-preorder-and-inorder-traversal", title:"Construct Tree from Preorder & Inorder", diff:"Medium", time:"45m", tag:"Divide & Conquer",
        concept:"Reconstruct a binary tree given its preorder and inorder traversal arrays (all unique values).",
        insight:"preorder[0] is always root. Find it in inorder — everything left is left subtree, everything right is right subtree. Use a HashMap for O(1) inorder lookups.",
        implement:"build(preStart, inStart, inEnd): root=preorder[preStart]. idx=inorderMap[root.val]. leftSize=idx-inStart. left=build(preStart+1, inStart, idx-1). right=build(preStart+1+leftSize, idx+1, inEnd).",
        complexity:"O(n) time · O(n) space",
        tests:[{i:"pre=[3,9,20,15,7], in=[9,3,15,20,7]",e:"[3,9,20,null,null,15,7]"},{i:"pre=[-1], in=[-1]",e:"[-1]"},{i:"pre=[1,2,3], in=[3,2,1]",e:"Right-skewed"}] },
      { id:"t10", num:124, slug:"binary-tree-maximum-path-sum",         title:"Binary Tree Maximum Path Sum",       diff:"Hard",   time:"45m", tag:"DFS",
        concept:"Find the maximum path sum in a binary tree. A path can start and end at any node but must go downward (no revisiting).",
        insight:"For any node, the best path through it = node.val + max(0, gainLeft) + max(0, gainRight). Track this globally. But the function returns the best single-branch (not split) path for the parent to use.",
        implement:"dfs(node) → max gain including node going in one direction. globalMax=max(globalMax, node.val+max(0,dfs(left))+max(0,dfs(right))). Return node.val+max(0, max(dfs(left),dfs(right))).",
        complexity:"O(n) time · O(h) space",
        tests:[{i:"[1,2,3]",e:"6",n:"Path 2→1→3"},{i:"[-10,9,20,null,null,15,7]",e:"42",n:"Path 15→20→7"},{i:"[-3]",e:"-3",n:"Single negative — must include it"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"heaps", label:"Heaps & PQ", icon:"△",
    title:"Heaps & Priority Queues",
    desc:"The data structure that always gives you the min or max in O(log n). Essential for greedy algorithms.",
    accent:"#c084fc", dim:"#140820", glow:"rgba(192,132,252,0.1)",
    problems:[
      { id:"h1",  num:703, slug:"kth-largest-element-in-a-stream",      title:"Kth Largest Element in a Stream",    diff:"Easy",   time:"20m", tag:"Min-Heap",
        concept:"Design a class that finds the kth largest element in a stream. add(val) inserts and returns the kth largest.",
        insight:"Maintain a min-heap of size k. The heap top is always the kth largest. When adding: push, then pop if size > k. Top of heap = kth largest.",
        implement:"PriorityQueue<Integer> minHeap (default). Constructor: add all initial elements (capped at k). add(val): offer(val); if size>k poll; return peek().",
        complexity:"O(n log k) · O(k) space",
        tests:[{i:"k=3, nums=[4,5,8,2]; add(3)→4; add(5)→5; add(10)→8; add(9)→8; add(4)→8",e:"As described"},{i:"k=1, nums=[]; add(-3)→-3; add(-2)→-2; add(-4)→-2",e:"As described"}] },
      { id:"h2",  num:1046,slug:"last-stone-weight",                    title:"Last Stone Weight",                  diff:"Easy",   time:"15m", tag:"Max-Heap",
        concept:"Smash the two heaviest stones together. If equal, both destroyed. If not, the difference survives. Return the last stone's weight or 0.",
        insight:"Always need the two heaviest — max-heap. Repeatedly extract two, compute result, re-insert if non-zero.",
        implement:"Max-heap (negate values in Java PQ). While size>1: a=poll, b=poll. If a≠b: offer(a-b). Return empty?0:poll.",
        complexity:"O(n log n) time · O(n) space",
        tests:[{i:"[2,7,4,1,8,1]",e:"1"},{i:"[1]",e:"1",n:"Single stone"},{i:"[2,2]",e:"0",n:"Equal stones destroy each other"}] },
      { id:"h3",  num:973, slug:"k-closest-points-to-origin",           title:"K Closest Points to Origin",         diff:"Medium", time:"25m", tag:"Max-Heap",
        concept:"Given points[], return the k closest to the origin. Distance = √(x²+y²). Exact order within k doesn't matter.",
        insight:"Max-heap of size k. For each point: if heap.size()<k or dist < heap.top's dist → add. Pop when size > k. Remaining heap is the k closest.",
        implement:"PQ<int[]> maxHeap by distance descending. For each point: offer. If size>k: poll (removes farthest). Return heap as array.",
        complexity:"O(n log k) time · O(k) space",
        tests:[{i:"[[1,3],[-2,2]], k=1",e:"[[-2,2]]",n:"dist(1,3)=√10, dist(-2,2)=√8"},{i:"[[3,3],[5,-1],[-2,4]], k=2",e:"[[3,3],[-2,4]]"}] },
      { id:"h4",  num:215, slug:"kth-largest-element-in-an-array",      title:"Kth Largest Element in an Array",    diff:"Medium", time:"25m", tag:"Min-Heap / Quickselect",
        concept:"Find the kth largest element in an unsorted array (not kth distinct).",
        insight:"Min-heap of size k: top is always kth largest. Quickselect is O(n) average but O(n²) worst. The heap approach is O(n log k) and more predictable.",
        implement:"Min-heap of size k. For each num: if heap.size()<k or num>heap.peek(): offer(num); if size>k: poll. Return heap.peek().",
        complexity:"O(n log k) time · O(k) space",
        tests:[{i:"[3,2,1,5,6,4], k=2",e:"5"},{i:"[3,2,3,1,2,4,5,5,6], k=4",e:"4"},{i:"[1], k=1",e:"1"}] },
      { id:"h5",  num:621, slug:"task-scheduler",                       title:"Task Scheduler",                     diff:"Medium", time:"35m", tag:"Greedy + Heap",
        concept:"Given tasks with frequencies and cooldown n (same task can't repeat within n intervals), find the minimum intervals needed.",
        insight:"Always schedule the most frequent remaining task. Formula: max((maxFreq-1)*(n+1)+countOfMaxFreq, tasks.length). The cooldown creates 'slots'; if all slots are filled by other tasks, no idle time needed.",
        implement:"Count frequencies. maxFreq = highest freq. countOfMax = tasks with maxFreq. ans = max((maxFreq-1)*(n+1)+countOfMax, tasks.length).",
        complexity:"O(n) time · O(1) space",
        tests:[{i:'tasks=["A","A","A","B","B","B"], n=2',e:"8",n:"ABABAB requires 8 slots (no idle here? Actually: A_B_AB... check)"},{i:'["A","A","A","B","B","B"], n=0',e:"6",n:"No cooldown"},{i:'["A","A","A","A","A","A","B","C","D","E","F","G"], n=2',e:"16"}] },
      { id:"h6",  num:295, slug:"find-median-from-data-stream",         title:"Find Median from Data Stream",        diff:"Hard",   time:"45m", tag:"Two Heaps",
        concept:"Design: addNum(int) and findMedian(). Support streaming numbers with O(log n) add and O(1) median.",
        insight:"Two heaps: max-heap for lower half, min-heap for upper half. Keep sizes balanced (differ by at most 1). Median = top of larger heap, or average of both tops.",
        implement:"addNum: add to maxHeap, move maxHeap.top to minHeap. If minHeap.size>maxHeap.size: move minHeap.top to maxHeap. findMedian: equal sizes→avg, else larger heap's top.",
        complexity:"O(log n) add · O(1) median · O(n) space",
        tests:[{i:"add(1); add(2); findMedian()→1.5; add(3); findMedian()→2.0",e:"As described"},{i:"add(6); findMedian()→6.0; add(10); findMedian()→8.0; add(2); findMedian()→6.0",e:"As described"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"graphs", label:"Graphs", icon:"◎",
    title:"Graphs, BFS & DFS",
    desc:"Everything is a graph. Learn to model your problem as one, and you unlock a universe of solutions.",
    accent:"#4ade80", dim:"#001a08", glow:"rgba(74,222,128,0.1)",
    problems:[
      { id:"g1",  num:200, slug:"number-of-islands",                    title:"Number of Islands",                  diff:"Medium", time:"25m", tag:"DFS / BFS",
        concept:"Count islands in a binary 2D grid ('1'=land, '0'=water). An island is connected land cells (4-directional).",
        insight:"Each land cell is a graph node with up to 4 edges. DFS/BFS from an unvisited '1' marks the entire connected component. Count how many times you trigger the search.",
        implement:"Iterate grid. On '1': dfs(r,c) marks it '0' (visited) and recurses on 4 neighbours. Count++. Both DFS and BFS work — BFS uses a queue.",
        complexity:"O(m·n) time · O(m·n) space",
        tests:[{i:"4×5 grid with one big island",e:"1"},{i:"5×5 grid with 3 islands",e:"3"},{i:"All water",e:"0"},{i:"[['1']]",e:"1"}] },
      { id:"g2",  num:133, slug:"clone-graph",                          title:"Clone Graph",                        diff:"Medium", time:"25m", tag:"DFS",
        concept:"Deep-copy a connected undirected graph. Each node has a value and a list of neighbors.",
        insight:"Cycles require a visited map (original→clone) created BEFORE recursing on neighbors. This 'create before recurse' pattern handles all topologies.",
        implement:"DFS with HashMap<Node,Node>. If node in map → return clone. Create clone, store in map, then clone all neighbors recursively.",
        complexity:"O(V+E) time · O(V) space",
        tests:[{i:"adj=[[2,4],[1,3],[2,4],[1,3]]",e:"Deep copy with same structure"},{i:"Single node, no neighbors",e:"New node, empty list"},{i:"Two mutually connected nodes",e:"Two cloned nodes pointing to each other"}] },
      { id:"g3",  num:695, slug:"max-area-of-island",                   title:"Max Area of Island",                 diff:"Medium", time:"20m", tag:"DFS",
        concept:"Find the maximum area of an island in a binary grid (0s and 1s). Area = cell count.",
        insight:"DFS returns the size of the component it visits. Instead of just counting island starts, sum up the area during DFS. Return 0 if no land.",
        implement:"dfs(r,c): if out-of-bounds or grid[r][c]==0 → return 0. Mark visited (set to 0). Return 1+dfs(r-1,c)+dfs(r+1,c)+dfs(r,c-1)+dfs(r,c+1).",
        complexity:"O(m·n) time · O(m·n) space",
        tests:[{i:"[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],...]",e:"6",n:"Largest island has 6 cells"},{i:"All zeros",e:"0"}] },
      { id:"g4",  num:417, slug:"pacific-atlantic-water-flow",          title:"Pacific Atlantic Water Flow",         diff:"Medium", time:"40m", tag:"Multi-source BFS",
        concept:"m×n matrix of heights. Water flows to adjacent cells ≤ current height. Find cells that can flow to both Pacific (top/left borders) and Atlantic (bottom/right borders).",
        insight:"Reverse the flow: BFS/DFS from ocean borders uphill (≥ current height). Cells reachable from both oceans are the answer.",
        implement:"BFS from all Pacific border cells, mark reachable. BFS from all Atlantic border cells. Intersection of both sets = answer.",
        complexity:"O(m·n) time · O(m·n) space",
        tests:[{i:"[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",e:"[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"},{i:"[[1]]",e:"[[0,0]]"}] },
      { id:"g5",  num:130, slug:"surrounded-regions",                   title:"Surrounded Regions",                 diff:"Medium", time:"30m", tag:"DFS",
        concept:"In a board of 'X' and 'O', capture all 'O' regions not connected to the border by flipping them to 'X'.",
        insight:"O cells on the border (and connected to border O's) can never be captured. Mark them first (DFS from borders), then flip all remaining O to X, and restore marked ones.",
        implement:"DFS from all border O cells, mark as 'S'. Then iterate: O→X, S→O.",
        complexity:"O(m·n) time · O(m·n) space",
        tests:[{i:'[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',e:'[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',n:"Bottom-left O touches border"},{i:'[["X"]]',e:'[["X"]]'}] },
      { id:"g6",  num:994, slug:"rotting-oranges",                      title:"Rotting Oranges",                    diff:"Medium", time:"30m", tag:"Multi-source BFS",
        concept:"Grid: 0=empty, 1=fresh, 2=rotten. Each minute, rotten infects adjacent fresh. Find minimum minutes to rot all oranges, or -1 if impossible.",
        insight:"Multi-source BFS starting simultaneously from ALL rotten cells. BFS naturally gives minimum time (levels = minutes). If any fresh remain after BFS → return -1.",
        implement:"Enqueue all initial rotten cells. BFS: each level = 1 minute. Spread to fresh neighbors, mark them rotten. After BFS: if any fresh left → -1 else return minutes.",
        complexity:"O(m·n) time · O(m·n) space",
        tests:[{i:"[[2,1,1],[1,1,0],[0,1,1]]",e:"4"},{i:"[[2,1,1],[0,1,1],[1,0,1]]",e:"-1",n:"Bottom-right isolated"},{i:"[[0,2]]",e:"0",n:"No fresh oranges"}] },
      { id:"g7",  num:207, slug:"course-schedule",                      title:"Course Schedule",                    diff:"Medium", time:"35m", tag:"Topological Sort",
        concept:"Can you finish all courses given prerequisites? prerequisites[i]=[a,b] means take b before a.",
        insight:"Cycle detection in a directed graph = can't finish. DFS with 3-color marking (0=unvisited, 1=in-progress, 2=done): reaching an in-progress node means cycle found.",
        implement:"Build adjacency list. DFS each unvisited node. On entry mark gray (1). On exit mark black (2). If reach gray → cycle → return false.",
        complexity:"O(V+E) time · O(V+E) space",
        tests:[{i:"n=2, [[1,0]]",e:"true"},{i:"n=2, [[1,0],[0,1]]",e:"false",n:"Cycle"},{i:"n=4, [[1,0],[2,0],[3,1],[3,2]]",e:"true",n:"Diamond DAG"}] },
      { id:"g8",  num:210, slug:"course-schedule-ii",                   title:"Course Schedule II",                 diff:"Medium", time:"35m", tag:"Topological Sort",
        concept:"Return the ordering of courses to finish all of them. Return empty array if impossible (cycle).",
        insight:"Topological sort: after completing DFS from a node (all descendants processed), append it to the result. Reverse the result at the end. Kahn's BFS: process in-degree-0 nodes, decrement neighbors.",
        implement:"DFS post-order: append node after all its neighbors are processed. Reverse. Or Kahn's: queue of in-degree-0 nodes, repeatedly dequeue and decrement neighbors' in-degrees.",
        complexity:"O(V+E) time · O(V+E) space",
        tests:[{i:"n=2, [[1,0]]",e:"[0,1]"},{i:"n=4, [[1,0],[2,0],[3,1],[3,2]]",e:"[0,1,2,3] or [0,2,1,3]"},{i:"n=2, [[1,0],[0,1]]",e:"[]",n:"Cycle — impossible"}] },
      { id:"g9",  num:684, slug:"redundant-connection",                 title:"Redundant Connection",               diff:"Medium", time:"30m", tag:"Union-Find",
        concept:"A tree with n nodes has been given one extra edge. Find and return the edge that makes it a cycle (if multiple, return the last one).",
        insight:"Process edges in order. For each edge, union the two nodes. If they're already in the same component (find gives same root), this edge is redundant.",
        implement:"Union-Find with path compression + union by rank. For each edge [u,v]: if find(u)==find(v) → return edge. Else union(u,v).",
        complexity:"O(n·α(n)) ≈ O(n) time · O(n) space",
        tests:[{i:"[[1,2],[1,3],[2,3]]",e:"[2,3]"},{i:"[[1,2],[2,3],[3,4],[1,4],[1,5]]",e:"[1,4]"},{i:"[[1,2],[2,3],[1,3]]",e:"[1,3]"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"dp", label:"Dyn. Programming", icon:"⬕",
    title:"Dynamic Programming",
    desc:"Find the subproblem. Define the recurrence. Memoize. Optimise space. In that order.",
    accent:"#f87171", dim:"#1a0202", glow:"rgba(248,113,113,0.1)",
    problems:[
      { id:"d1",  num:70,  slug:"climbing-stairs",                      title:"Climbing Stairs",                    diff:"Easy",   time:"15m", tag:"1D DP",
        concept:"You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of n stairs?",
        insight:"f(n) = f(n-1) + f(n-2). Derive this: last step was from n-1 (1 step) OR n-2 (2 steps). This 'last choice' reasoning is the template for ALL 1D DP.",
        implement:"Memoized recursion → bottom-up table → O(1) rolling variables (prev2=1, prev1=1; for i=2: cur=prev1+prev2; shift).",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"n=2",e:"2",n:"[1+1, 2]"},{i:"n=3",e:"3"},{i:"n=10",e:"89"},{i:"n=1",e:"1"}] },
      { id:"d2",  num:198, slug:"house-robber",                         title:"House Robber",                       diff:"Medium", time:"20m", tag:"1D DP",
        concept:"Rob houses without robbing two adjacent. Maximise total. Extend to circular arrangement (LC 213).",
        insight:"At each house: rob it (nums[i]+dp[i-2]) or skip (dp[i-1]). Only two previous states needed → O(1) space. Circular: solve two linear sub-problems.",
        implement:"prev2=0, prev1=0. For each num: cur=max(prev1, prev2+num); prev2=prev1; prev1=cur. Return prev1. Circular: max(rob(0..n-2), rob(1..n-1)).",
        complexity:"O(n) time · O(1) space",
        tests:[{i:"[1,2,3,1]",e:"4",n:"Rob house 0 and 2"},{i:"[2,7,9,3,1]",e:"12",n:"2+9+1"},{i:"[1]",e:"1"}] },
      { id:"d3",  num:5,   slug:"longest-palindromic-substring",        title:"Longest Palindromic Substring",      diff:"Medium", time:"30m", tag:"Expand Around Center",
        concept:"Find the longest palindromic substring of s.",
        insight:"Expand around center: for each character (and each gap between chars), expand outward while chars match. O(n) each, O(n) centers → O(n²) total but O(1) space.",
        implement:"For each i: expand for odd palindromes (center=i) and even (center between i and i+1). Track (start, maxLen). Return s.substring(start, start+maxLen).",
        complexity:"O(n²) time · O(1) space",
        tests:[{i:'"babad"',e:'"bab" or "aba"',n:"Both valid"},{i:'"cbbd"',e:'"bb"'},{i:'"a"',e:'"a"'},{i:'"racecar"',e:'"racecar"'}] },
      { id:"d4",  num:647, slug:"palindromic-substrings",               title:"Palindromic Substrings",             diff:"Medium", time:"25m", tag:"Expand Around Center",
        concept:"Count all palindromic substrings of s.",
        insight:"Same expand-around-center technique. Every successful expansion (chars match) is a palindromic substring. Count up for each center.",
        implement:"For each center (2n-1 centers): expand while in-bounds and chars match, count++.",
        complexity:"O(n²) time · O(1) space",
        tests:[{i:'"abc"',e:"3",n:'"a","b","c" — all single chars'},{i:'"aaa"',e:"6",n:'"a"×3, "aa"×2, "aaa"×1'},{i:'"racecar"',e:"10"}] },
      { id:"d5",  num:91,  slug:"decode-ways",                          title:"Decode Ways",                        diff:"Medium", time:"30m", tag:"1D DP",
        concept:"A string of digits can be decoded: 1→A, 2→B,..., 26→Z. Return number of ways to decode. String may have leading zeros.",
        insight:"dp[i] = ways to decode s[0..i-1]. One-digit decode: if s[i-1]≠'0', dp[i]+=dp[i-1]. Two-digit decode: if s[i-2..i-1] in [10,26], dp[i]+=dp[i-2].",
        implement:"dp[0]=1 (empty), dp[1]=(s[0]≠'0'?1:0). Fill dp[2..n] with the two transitions above.",
        complexity:"O(n) time · O(n) space (O(1) optimised)",
        tests:[{i:'"12"',e:"2",n:'"AB" or "L"'},{i:'"226"',e:"3",n:'"BZ","VF","BBF"'},{i:'"06"',e:"0",n:"Leading zero — invalid"},{i:'"0"',e:"0"}] },
      { id:"d6",  num:322, slug:"coin-change",                          title:"Coin Change",                        diff:"Medium", time:"30m", tag:"Unbounded Knapsack",
        concept:"Minimum coins to make amount. Coins can repeat. Return -1 if impossible.",
        insight:"Greedy fails (try [1,3,4] amount=6: greedy gives 4+1+1=3, optimal is 3+3=2). DP: dp[i]=min(dp[i-c]+1 for each coin c). Unbounded because coins repeat.",
        implement:"dp[0]=0, dp[1..amount]=∞. For each amount i, try each coin: dp[i]=min(dp[i], dp[i-c]+1 if i≥c). Return dp[amount] if finite else -1.",
        complexity:"O(amount·|coins|) time · O(amount) space",
        tests:[{i:"coins=[1,5,10,25], amount=41",e:"4",n:"25+10+5+1"},{i:"coins=[2], amount=3",e:"-1"},{i:"coins=[1,2,5], amount=11",e:"3",n:"5+5+1"}] },
      { id:"d7",  num:139, slug:"word-break",                           title:"Word Break",                         diff:"Medium", time:"30m", tag:"1D DP",
        concept:"Given string s and wordDict, return true if s can be segmented into space-separated words from the dictionary.",
        insight:"dp[i] = can s[0..i-1] be segmented. For each i, try all j<i: if dp[j] is true AND s[j..i-1] is in dict → dp[i]=true.",
        implement:"Set wordSet. dp[0]=true. For i=1..n: for j=0..i-1: if dp[j] && wordSet.contains(s.substring(j,i)): dp[i]=true; break.",
        complexity:"O(n² · m) time · O(n+dict) space",
        tests:[{i:'s="leetcode", dict=["leet","code"]',e:"true"},{i:'s="applepenapple", dict=["apple","pen"]',e:"true"},{i:'s="catsandog", dict=["cats","dog","sand","and","cat"]',e:"false"}] },
      { id:"d8",  num:300, slug:"longest-increasing-subsequence",       title:"Longest Increasing Subsequence",     diff:"Medium", time:"40m", tag:"Binary Search / DP",
        concept:"Find the length of the longest strictly increasing subsequence. O(n log n) required.",
        insight:"Patience sort: maintain tails[] where tails[k] = smallest tail of any LIS of length k+1. Binary search to find where to place each number. tails.size() = LIS length.",
        implement:"O(n²): dp[i]=max(dp[j]+1 for j<i where nums[j]<nums[i]). O(n log n): for each num, binary search in tails for first value ≥ num, replace it (or extend).",
        complexity:"O(n log n) time · O(n) space",
        tests:[{i:"[10,9,2,5,3,7,101,18]",e:"4",n:"[2,3,7,101]"},{i:"[0,1,0,3,2,3]",e:"4"},{i:"[7,7,7,7]",e:"1",n:"Strictly increasing — no repeats"}] },
      { id:"d9",  num:416, slug:"partition-equal-subset-sum",           title:"Partition Equal Subset Sum",         diff:"Medium", time:"35m", tag:"0/1 Knapsack",
        concept:"Can the array be partitioned into two subsets with equal sum?",
        insight:"Target = total/2. Problem reduces to: can we find a subset summing to target? Classic 0/1 knapsack boolean variant. dp[j] = can we reach sum j.",
        implement:"If sum is odd → false. dp[0]=true. For each num (iterate j backwards from target to num): dp[j] |= dp[j-num]. Return dp[target].",
        complexity:"O(n·sum) time · O(sum) space",
        tests:[{i:"[1,5,11,5]",e:"true",n:"[1,5,5] and [11]"},{i:"[1,2,3,5]",e:"false"},{i:"[1,1]",e:"true"},{i:"[3,3,3,4,5]",e:"true"}] },
      { id:"d10", num:62,  slug:"unique-paths",                         title:"Unique Paths",                       diff:"Medium", time:"20m", tag:"2D DP",
        concept:"Robot moves right or down only in an m×n grid from top-left to bottom-right. How many unique paths?",
        insight:"dp[i][j] = paths to (i,j) = dp[i-1][j] + dp[i][j-1]. First row and column are all 1 (only one way to reach them). Can optimise to O(n) space with a single row.",
        implement:"1D dp of size n (row). dp = [1]*n. For each row: for j=1..n-1: dp[j]+=dp[j-1]. Return dp[n-1].",
        complexity:"O(m·n) time · O(n) space",
        tests:[{i:"m=3, n=7",e:"28"},{i:"m=3, n=2",e:"3"},{i:"m=1, n=1",e:"1"}] },
      { id:"d11", num:72,  slug:"edit-distance",                        title:"Edit Distance",                      diff:"Hard",   time:"45m", tag:"2D DP",
        concept:"Minimum operations (insert, delete, replace) to transform word1 into word2.",
        insight:"dp[i][j] = edit distance of word1[0..i-1] and word2[0..j-1]. If chars match: copy diagonal. Else: min(replace=dp[i-1][j-1]+1, delete=dp[i-1][j]+1, insert=dp[i][j-1]+1).",
        implement:"Base cases: dp[i][0]=i, dp[0][j]=j. Fill table. O(min(m,n)) space with two rows.",
        complexity:"O(m·n) time · O(min(m,n)) space",
        tests:[{i:'"horse"→"ros"',e:"3"},{i:'"intention"→"execution"',e:"5"},{i:'"abc"→"abc"',e:"0"},{i:'"a"→""',e:"1"}] },
      { id:"d12", num:312, slug:"burst-balloons",                       title:"Burst Balloons",                     diff:"Hard",   time:"65m", tag:"Interval DP",
        concept:"Burst all balloons for max coins. Bursting i earns nums[i-1]×nums[i]×nums[i+1]. Return max coins.",
        insight:"Think about which balloon is burst LAST in a range (not first). If k is last in (i,j), neighbours at burst time are nums[i] and nums[j] — making subproblems independent.",
        implement:"Add sentinel 1s at both ends. dp[i][j] = max coins in open range (i,j). For length 2..n+2: for each i: for k=i+1..j-1: dp[i][j]=max(dp[i][k]+nums[i]*nums[k]*nums[j]+dp[k][j]).",
        complexity:"O(n³) time · O(n²) space",
        tests:[{i:"[3,1,5,8]",e:"167"},{i:"[1,5]",e:"10"},{i:"[5]",e:"5"},{i:"[1,2,3,4]",e:"34"}] },
    ],
  },
  // ─────────────────────────────────────────────
  {
    id:"backtrack", label:"Backtracking", icon:"↺",
    title:"Backtracking",
    desc:"Try all possibilities systematically. Prune invalid branches early. The decision tree is your map.",
    accent:"#f9a8d4", dim:"#1a0010", glow:"rgba(249,168,212,0.1)",
    problems:[
      { id:"bt1", num:78,  slug:"subsets",                              title:"Subsets",                            diff:"Medium", time:"25m", tag:"Backtracking",
        concept:"Return all possible subsets (power set) of a distinct integer array.",
        insight:"At each element, two choices: include or exclude. This generates a binary decision tree with 2^n leaves. Backtracking: add element, recurse, remove element.",
        implement:"backtrack(start, current): add copy of current to result. For i=start..n: add nums[i], recurse(i+1, current), remove nums[i].",
        complexity:"O(2^n · n) time · O(2^n · n) space",
        tests:[{i:"[1,2,3]",e:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"},{i:"[0]",e:"[[],[0]]"},{i:"[1,2]",e:"[[],[1],[2],[1,2]]"}] },
      { id:"bt2", num:39,  slug:"combination-sum",                      title:"Combination Sum",                    diff:"Medium", time:"30m", tag:"Backtracking",
        concept:"Find all unique combinations of candidates (no duplicates) that sum to target. The same number can be used unlimited times.",
        insight:"Backtrack with a start index to avoid reusing earlier elements. Pass (remaining = target - picked). When remaining=0, found a valid combo. Prune: if remaining<0, backtrack.",
        implement:"backtrack(start, remaining, current): if remaining==0 add copy. For i=start..n: add candidates[i], recurse(i, remaining-candidates[i]), remove.",
        complexity:"O(n^(target/min) · k) time · O(target/min) depth",
        tests:[{i:"candidates=[2,3,6,7], target=7",e:"[[2,2,3],[7]]"},{i:"candidates=[2,3,8], target=10",e:"[[2,2,2,2],[2,3,3],[2,8]]"},{i:"candidates=[2], target=1",e:"[]"}] },
      { id:"bt3", num:46,  slug:"permutations",                         title:"Permutations",                       diff:"Medium", time:"25m", tag:"Backtracking",
        concept:"Return all permutations of a distinct integer array.",
        insight:"For each position, choose an unused element. Backtrack by swapping back (or using a visited boolean). The decision tree has n! leaves.",
        implement:"With swap: backtrack(start): if start==n add copy. For i=start..n: swap(i,start), recurse(start+1), swap back. With visited: boolean[], add unused elements.",
        complexity:"O(n! · n) time · O(n! · n) space",
        tests:[{i:"[1,2,3]",e:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"},{i:"[0,1]",e:"[[0,1],[1,0]]"},{i:"[1]",e:"[[1]]"}] },
      { id:"bt4", num:90,  slug:"subsets-ii",                           title:"Subsets II",                         diff:"Medium", time:"30m", tag:"Backtracking",
        concept:"Return all unique subsets of an array that may contain duplicates.",
        insight:"Sort first. Skip duplicates at the same recursion level: if i>start and nums[i]==nums[i-1], skip. This avoids generating the same subset via different paths.",
        implement:"Sort. backtrack(start, current): add copy. For i=start..n: if i>start && nums[i]==nums[i-1] continue. Add, recurse(i+1), remove.",
        complexity:"O(2^n · n) time · O(2^n · n) space",
        tests:[{i:"[1,2,2]",e:"[[],[1],[1,2],[1,2,2],[2],[2,2]]"},{i:"[0]",e:"[[],[0]]"},{i:"[1,1,2]",e:"[[],[1],[1,1],[1,1,2],[1,2],[2]]"}] },
      { id:"bt5", num:40,  slug:"combination-sum-ii",                   title:"Combination Sum II",                 diff:"Medium", time:"30m", tag:"Backtracking",
        concept:"Each candidate can only be used once. Find all unique combinations summing to target.",
        insight:"Sort. Skip duplicate candidates at the same recursion depth (same trick as Subsets II). Advance start by 1 (not i) to prevent reuse of the same element.",
        implement:"Sort. backtrack(start, remaining): if 0 add. For i=start..n: if i>start && candidates[i]==candidates[i-1] skip. If candidates[i]>remaining break (sorted). Add, recurse(i+1, rem-c[i]), remove.",
        complexity:"O(2^n · n) time · O(n) depth",
        tests:[{i:"candidates=[10,1,2,7,6,1,5], target=8",e:"[[1,1,6],[1,2,5],[1,7],[2,6]]"},{i:"candidates=[2,5,2,1,2], target=5",e:"[[1,2,2],[5]]"}] },
      { id:"bt6", num:79,  slug:"word-search",                          title:"Word Search",                        diff:"Medium", time:"35m", tag:"Backtracking",
        concept:"Given a 2D grid of characters, return true if the word exists as a path of adjacent cells (4-directional, can't reuse cells).",
        insight:"DFS + backtracking from each cell. Mark cell as visited before recursing, unmark after. Pruning: if first char doesn't match, skip.",
        implement:"For each (r,c): if dfs(r,c,0) return true. dfs(r,c,idx): if idx==word.length return true. If OOB or visited or grid[r][c]≠word[idx] return false. Mark, recurse 4 dirs, unmark.",
        complexity:"O(m·n·4^L) time · O(L) space",
        tests:[{i:'grid=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"',e:"true"},{i:'Same grid, word="SEE"',e:"true"},{i:'Same grid, word="ABCB"',e:"false",n:"Can\'t reuse B"}] },
      { id:"bt7", num:131, slug:"palindrome-partitioning",              title:"Palindrome Partitioning",            diff:"Medium", time:"35m", tag:"Backtracking",
        concept:"Partition string s so that every substring of the partition is a palindrome. Return all possible partitions.",
        insight:"Backtrack over all prefixes starting from current position. If the prefix is a palindrome, include it and recurse on the rest. An empty remaining string completes a valid partition.",
        implement:"backtrack(start, current): if start==n add copy. For end=start+1..n: if isPalin(start,end-1): add substring, recurse(end), remove.",
        complexity:"O(n · 2^n) time · O(n) depth",
        tests:[{i:'"aab"',e:'[["a","a","b"],["aa","b"]]'},{i:'"a"',e:'[["a"]]'},{i:'"aba"',e:'[["a","b","a"],["aba"]]'}] },
      { id:"bt8", num:51,  slug:"n-queens",                             title:"N-Queens",                           diff:"Hard",   time:"50m", tag:"Backtracking",
        concept:"Place n queens on an n×n board so no two attack each other. Return all valid board configurations.",
        insight:"Place one queen per row. Track which columns and diagonals are occupied (3 sets: col, diag=row-col, antiDiag=row+col). Prune immediately when a conflict is detected.",
        implement:"backtrack(row, colSet, diagSet, antiDiagSet, board): if row==n add board copy. For each col: if valid: place, add to sets, recurse(row+1), remove queen, remove from sets.",
        complexity:"O(n!) time · O(n²) space",
        tests:[{i:"n=4",e:'[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',n:"Two solutions"},{i:"n=1",e:'[["Q"]]'},{i:"n=2",e:"[]",n:"No solution"}] },
    ],
  },
];

const DIFF_STYLE = {
  Easy:   { bg:"#052e16", text:"#4ade80", border:"#166534" },
  Medium: { bg:"#1c1a00", text:"#fbbf24", border:"#92400e" },
  Hard:   { bg:"#250010", text:"#f87171", border:"#9f1239" },
};

function AnimBar({ pct, color, h = 4 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 120); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height: h, background:"#1e1e14", borderRadius:99, overflow:"hidden", width:"100%" }}>
      <div style={{ height:"100%", width:`${w}%`, background:color, borderRadius:99, transition:"width 0.7s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function TestCase({ tc, accent, idx }) {
  return (
    <div style={{ background:"#06050a", border:"1px solid #1a1510", borderRadius:8, padding:"10px 12px" }}>
      <div style={{ display:"flex", gap:8, marginBottom:tc.n?6:0, flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 180px" }}>
          <div style={{ fontSize:9, letterSpacing:"1.5px", color:"#3a2e1e", marginBottom:3, textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>Input</div>
          <code style={{ fontSize:11, color:"#c8b89a", background:"#0e0c08", padding:"4px 8px", borderRadius:5, display:"block", wordBreak:"break-all", fontFamily:"'DM Mono',monospace", lineHeight:1.5 }}>{tc.i}</code>
        </div>
        <div style={{ flex:"1 1 120px" }}>
          <div style={{ fontSize:9, letterSpacing:"1.5px", color:"#3a2e1e", marginBottom:3, textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>Expected</div>
          <code style={{ fontSize:11, color:"#4ade80", background:"#050e05", padding:"4px 8px", borderRadius:5, display:"block", wordBreak:"break-all", fontFamily:"'DM Mono',monospace", lineHeight:1.5 }}>{tc.e}</code>
        </div>
      </div>
      {tc.n && <div style={{ fontSize:10, color:"#5a4a30", fontFamily:"'Outfit',sans-serif", lineHeight:1.5, borderTop:"1px solid #1a1510", paddingTop:5 }}>💬 {tc.n}</div>}
    </div>
  );
}

const TABS = ["Problem","Insight","Approach","Tests"];

function ProblemCard({ p, topic, done, onToggle }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("Problem");
  const [flash, setFlash] = useState(false);
  const d = DIFF_STYLE[p.diff];

  const check = (e) => {
    e.stopPropagation();
    if (!done) { setFlash(true); setTimeout(() => setFlash(false), 600); }
    onToggle(p.id);
  };

  const fmt = (txt) => (txt||"").split('`').map((s, i) =>
    i % 2 === 1
      ? <code key={i} style={{ background:"#1e1e14", padding:"2px 6px", borderRadius:4, color:topic.accent, fontSize:"0.88em", fontFamily:"'DM Mono',monospace" }}>{s}</code>
      : s
  );

  const lcUrl = `https://leetcode.com/problems/${p.slug}/`;

  return (
    <div style={{
      background: done ? `${topic.dim}cc` : "#0e0c0a",
      border:`1px solid ${done ? topic.accent+"55" : "#1e1a14"}`,
      borderRadius:12, overflow:"hidden",
      transform: flash ? "scale(1.012)" : "scale(1)",
      transition:"all 0.3s cubic-bezier(.4,0,.2,1)",
      boxShadow: flash ? `0 0 28px ${topic.accent}44` : done ? `0 0 14px ${topic.accent}15` : "none",
    }}>
      <div onClick={() => setOpen(o => !o)} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", cursor:"pointer", userSelect:"none" }}>
        <button onClick={check} style={{
          width:24, height:24, borderRadius:7, flexShrink:0,
          border:`2px solid ${done ? topic.accent : "#2a2518"}`,
          background: done ? topic.accent : "transparent",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:13, color:"#0a0800", fontWeight:900,
          transform: flash ? "scale(1.4) rotate(10deg)" : "scale(1)",
          transition:"all 0.25s",
        }}>{done && "✓"}</button>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
            <span style={{ fontSize:10, color:"#5a4a30", fontFamily:"'DM Mono',monospace" }}>#{p.num}</span>
            <span style={{
              fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif",
              color: done ? "#3a3020" : "#f5f0e8",
              textDecoration: done ? "line-through" : "none", transition:"color 0.2s",
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
            }}>{p.title}</span>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ fontSize:10, padding:"2px 7px", borderRadius:99, background:d.bg, color:d.text, border:`1px solid ${d.border}`, fontFamily:"'DM Mono',monospace" }}>{p.diff}</span>
            <span style={{ fontSize:10, padding:"2px 7px", borderRadius:99, background:`${topic.accent}15`, color:topic.accent, border:`1px solid ${topic.accent}33`, fontFamily:"'DM Mono',monospace" }}>{p.tag}</span>
            <span style={{ fontSize:10, color:"#3a2e1e", fontFamily:"'DM Mono',monospace" }}>⏱ {p.time}</span>
          </div>
        </div>

        <a href={lcUrl} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            fontSize:10, padding:"4px 10px", borderRadius:6,
            background:"#1a1208", border:"1px solid #3a2e1e",
            color:"#f59e0b", textDecoration:"none", flexShrink:0,
            fontFamily:"'DM Mono',monospace", letterSpacing:"0.5px",
            transition:"all 0.15s", whiteSpace:"nowrap",
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor="#f59e0b"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="#3a2e1e"}
        >LC ↗</a>

        <span style={{ color:"#2a2518", fontSize:10, transform:open?"rotate(90deg)":"none", transition:"transform 0.2s", flexShrink:0 }}>▶</span>
      </div>

      {open && (
        <div style={{ borderTop:"1px solid #1a1510", animation:"slideDown 0.2s ease" }}>
          <div style={{ display:"flex", background:"#080600", borderBottom:"1px solid #1a1510", overflowX:"auto" }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:"1 0 auto", padding:"9px 12px",
                border:"none", borderBottom:`2px solid ${tab===t ? topic.accent : "transparent"}`,
                background: tab===t ? topic.dim : "transparent",
                color: tab===t ? topic.accent : "#3a2e1e",
                cursor:"pointer", fontSize:10, fontFamily:"'DM Mono',monospace",
                letterSpacing:"0.5px", transition:"all 0.15s", whiteSpace:"nowrap",
              }}>{t}{t==="Tests"?` (${p.tests.length})`:"" }</button>
            ))}
          </div>

          <div style={{ padding:16 }}>
            {tab === "Problem" && (
              <div>
                <p style={{ fontSize:13, color:"#c8b89a", lineHeight:1.85, margin:"0 0 12px", fontFamily:"'Outfit',sans-serif" }}>{fmt(p.concept)}</p>
                <a href={lcUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:11, color:"#f59e0b", textDecoration:"none", fontFamily:"'DM Mono',monospace", display:"inline-flex", alignItems:"center", gap:4, padding:"6px 12px", background:"#1a1208", border:"1px solid #3a2e1e", borderRadius:7 }}>
                  Open on LeetCode ↗
                </a>
              </div>
            )}
            {tab === "Insight" && (
              <div style={{ background:topic.dim, border:`1px solid ${topic.accent}28`, borderLeft:`3px solid ${topic.accent}`, borderRadius:9, padding:"14px 16px" }}>
                <p style={{ fontSize:12, color:"#8a7a60", lineHeight:1.85, margin:0, fontFamily:"'Outfit',sans-serif" }}>{p.insight}</p>
              </div>
            )}
            {tab === "Approach" && (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ background:"#050e08", border:"1px solid #1a2a14", borderLeft:"3px solid #4ade80", borderRadius:9, padding:"12px 14px" }}>
                  <p style={{ fontSize:12, color:"#7a9a6a", lineHeight:1.85, margin:0, fontFamily:"'Outfit',sans-serif" }}>{fmt(p.implement)}</p>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 12px", background:"#06050a", border:"1px solid #1a1510", borderRadius:8, alignSelf:"flex-start" }}>
                  <span style={{ fontSize:9, color:"#3a2e1e", fontFamily:"'DM Mono',monospace", letterSpacing:"1px", textTransform:"uppercase" }}>Complexity</span>
                  <span style={{ fontSize:11, color:topic.accent, fontFamily:"'DM Mono',monospace", fontWeight:500 }}>{p.complexity}</span>
                </div>
              </div>
            )}
            {tab === "Tests" && (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ fontSize:10, color:"#5a4a30", fontFamily:"'Outfit',sans-serif", marginBottom:4 }}>Run these against your implementation before marking done.</div>
                {p.tests.map((tc, i) => <TestCase key={i} tc={tc} accent={topic.accent} idx={i} />)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DSATracker() {
  const [done, setDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dsa-lc") || "{}"); } catch { return {}; } });
  const [activeT, setActiveT] = useState(0);
  const [filterDiff, setFilterDiff] = useState("All");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => { try { localStorage.setItem("dsa-lc", JSON.stringify(done)); } catch {} }, [done]);

  const toggle = (id) => setDone(p => ({ ...p, [id]: !p[id] }));
  const all = TOPICS.flatMap(t => t.problems);
  const totalDone = all.filter(p => done[p.id]).length;
  const totalPct = Math.round(totalDone / all.length * 100);
  const T = TOPICS[activeT];
  const tDone = T.problems.filter(p => done[p.id]).length;
  const tPct = Math.round(tDone / T.problems.length * 100);
  const filtered = filterDiff === "All" ? T.problems : T.problems.filter(p => p.diff === filterDiff);
  const DIFFS = ["All","Easy","Medium","Hard"];
  const totalTests = all.reduce((s,p) => s+p.tests.length, 0);

  const easyCount   = all.filter(p=>p.diff==="Easy").length;
  const medCount    = all.filter(p=>p.diff==="Medium").length;
  const hardCount   = all.filter(p=>p.diff==="Hard").length;

  return (
    <div style={{ minHeight:"100vh", background:"#0a0800", fontFamily:"'Outfit',sans-serif", color:"#f5f0e8", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,700;1,9..144,800&family=Outfit:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes slideDown { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:#0a0800}
        ::-webkit-scrollbar-thumb{background:#2a2218;border-radius:99px}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(170deg,#0f0b00,#120900,#0f0b00)", borderBottom:"1px solid #1e1a10", padding:"clamp(20px,4vw,34px) clamp(16px,4vw,40px) clamp(16px,3vw,24px)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:"5%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(232,197,71,0.06),transparent 65%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:960, margin:"0 auto", position:"relative" }}>
          {/* Title row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap", marginBottom:22 }}>
            <div style={{ opacity:mounted?1:0, transform:mounted?"none":"translateY(8px)", transition:"all 0.5s" }}>
              <div style={{ fontSize:10, letterSpacing:"4px", textTransform:"uppercase", color:"#3a2e1e", marginBottom:8, fontFamily:"'DM Mono',monospace" }}>
                LeetCode · DSA Curriculum
              </div>
              <h1 style={{ fontSize:"clamp(22px,5vw,36px)", fontWeight:700, margin:"0 0 6px", lineHeight:1.1, color:"#f5f0e8", fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>
                Think in Algorithms
              </h1>
              <p style={{ fontSize:12, color:"#5a4a30", margin:0, fontFamily:"'DM Mono',monospace" }}>
                {TOPICS.length} topics · {all.length} problems · {totalTests} test cases
              </p>
              {/* difficulty pill row */}
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                {[{l:"Easy",c:easyCount,s:LC.Easy},{l:"Medium",c:medCount,s:LC.Medium},{l:"Hard",c:hardCount,s:LC.Hard}].map(x=>(
                  <span key={x.l} style={{ fontSize:10, padding:"2px 9px", borderRadius:99, background:x.s.bg, color:x.s.text, border:`1px solid ${x.s.border}`, fontFamily:"'DM Mono',monospace" }}>
                    {x.l} {x.c}
                  </span>
                ))}
              </div>
            </div>

            {/* Ring */}
            <div style={{ opacity:mounted?1:0, transition:"all 0.5s ease 0.2s", flexShrink:0, position:"relative", width:90, height:90 }}>
              <svg width="90" height="90" viewBox="0 0 90 90" style={{ position:"absolute", inset:0, transform:"rotate(-90deg)" }}>
                <circle cx="45" cy="45" r="37" fill="none" stroke="#1e1a10" strokeWidth="7"/>
                <circle cx="45" cy="45" r="37" fill="none" stroke="url(#dg)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*37}`}
                  strokeDashoffset={`${2*Math.PI*37*(1-totalPct/100)}`}
                  style={{ transition:"stroke-dashoffset 1.2s ease" }}/>
                <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4ade80"/><stop offset="50%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#f87171"/>
                </linearGradient></defs>
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2 }}>
                <span style={{ fontSize:19, fontWeight:700, color:"#f5f0e8", lineHeight:1, fontFamily:"'Fraunces',serif" }}>{totalPct}%</span>
                <span style={{ fontSize:9, color:"#5a4a30", fontFamily:"'DM Mono',monospace" }}>{totalDone}/{all.length}</span>
              </div>
            </div>
          </div>

          {/* Per-topic grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
            {TOPICS.map((t, i) => {
              const d2 = t.problems.filter(p => done[p.id]).length;
              const pc = Math.round(d2/t.problems.length*100);
              const isAct = activeT===i;
              return (
                <div key={t.id} onClick={() => { setActiveT(i); setFilterDiff("All"); }} style={{
                  padding:"9px 11px", borderRadius:9, cursor:"pointer",
                  background:isAct?t.dim:"#0e0c08",
                  border:`1px solid ${isAct?t.accent+"55":"#1a1510"}`,
                  transition:"all 0.25s",
                  opacity:mounted?1:0,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                    <span style={{ fontSize:10, color:isAct?t.accent:"#5a4a30", fontWeight:600, fontFamily:"'Outfit',sans-serif", lineHeight:1.2 }}>{t.label}</span>
                    <span style={{ fontSize:15 }}>{t.icon}</span>
                  </div>
                  <AnimBar pct={pc} color={t.accent} h={3}/>
                  <div style={{ fontSize:9, color:isAct?t.accent:"#3a2e1e", marginTop:5, fontFamily:"'DM Mono',monospace" }}>{d2}/{t.problems.length}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", background:"#080600", borderBottom:"1px solid #1a1510", overflowX:"auto" }}>
        {TOPICS.map((t, i) => {
          const active = activeT===i;
          const d2 = t.problems.filter(p => done[p.id]).length;
          return (
            <button key={t.id} onClick={() => { setActiveT(i); setFilterDiff("All"); }} style={{
              flex:"1 0 auto", minWidth:64, padding:"11px 6px",
              border:"none", borderBottom:`2px solid ${active?t.accent:"transparent"}`,
              background:active?t.dim:"transparent",
              color:active?t.accent:"#3a2e1e",
              cursor:"pointer", transition:"all 0.2s", fontFamily:"'Outfit',sans-serif",
            }}>
              <div style={{ fontSize:16, marginBottom:3, transition:"transform 0.2s", transform:active?"scale(1.2)":"scale(1)" }}>{t.icon}</div>
              <div style={{ fontSize:9, fontWeight:600 }}>{t.label}</div>
              <div style={{ fontSize:8, marginTop:2, opacity:0.65, fontFamily:"'DM Mono',monospace" }}>{d2}/{t.problems.length}</div>
            </button>
          );
        })}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"clamp(14px,3vw,24px) clamp(12px,3vw,24px)" }}>
        {/* Topic header */}
        <div key={T.id} style={{
          background:T.dim, border:`1px solid ${T.accent}28`,
          borderRadius:14, padding:"18px 22px", marginBottom:18,
          boxShadow:`0 0 60px ${T.glow}`, animation:"fadeUp 0.3s ease",
        }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <span style={{ fontSize:20 }}>{T.icon}</span>
                <span style={{ fontSize:"clamp(15px,3vw,19px)", fontWeight:700, color:T.accent, fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>{T.title}</span>
              </div>
              <p style={{ fontSize:12, color:"#5a4a30", margin:"0 0 13px", lineHeight:1.6 }}>{T.desc}</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {DIFFS.map(d => (
                  <button key={d} onClick={() => setFilterDiff(d)} style={{
                    padding:"4px 11px", borderRadius:99,
                    border:`1px solid ${filterDiff===d?T.accent+"88":"#1e1a10"}`,
                    background:filterDiff===d?`${T.accent}20`:"transparent",
                    color:filterDiff===d?T.accent:"#5a4a30",
                    cursor:"pointer", fontSize:10, fontFamily:"'DM Mono',monospace", transition:"all 0.15s",
                  }}>{d}</button>
                ))}
              </div>
            </div>
            <div style={{ textAlign:"center", flexShrink:0 }}>
              <div style={{ fontSize:26, fontWeight:700, color:T.accent, lineHeight:1, fontFamily:"'Fraunces',serif" }}>{tPct}%</div>
              <div style={{ fontSize:9, color:"#5a4a30", marginTop:4, fontFamily:"'DM Mono',monospace" }}>{tDone}/{T.problems.length}</div>
              <div style={{ width:72, marginTop:10 }}><AnimBar pct={tPct} color={T.accent} h={4}/></div>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, animation:"fadeUp 0.3s ease" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:40, color:"#3a2e1e", fontFamily:"'DM Mono',monospace", fontSize:11 }}>No {filterDiff} problems in this topic yet.</div>
          )}
          {filtered.map(p => (
            <ProblemCard key={p.id} p={p} topic={T} done={!!done[p.id]} onToggle={toggle}/>
          ))}
        </div>

        {tDone === T.problems.length && tDone > 0 && (
          <div style={{ marginTop:18, padding:22, borderRadius:14, textAlign:"center",
            background:T.dim, border:`1px solid ${T.accent}44`,
            boxShadow:`0 0 60px ${T.glow}`, animation:"fadeUp 0.5s ease" }}>
            <div style={{ fontSize:26, marginBottom:8 }}>🏆</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.accent, marginBottom:5, fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>{T.title} — Complete</div>
            {activeT < TOPICS.length-1 && (
              <button onClick={() => { setActiveT(activeT+1); setFilterDiff("All"); window.scrollTo(0,0); }} style={{
                marginTop:6, padding:"9px 22px", borderRadius:99, background:T.accent, color:"#0a0800",
                border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Outfit',sans-serif",
              }}>Next: {TOPICS[activeT+1].title} →</button>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign:"center", padding:"18px 16px", color:"#141008", fontSize:9, fontFamily:"'DM Mono',monospace" }}>
        {all.length} LeetCode problems · {totalTests} test cases · {totalDone} solved · progress saved locally
      </div>
    </div>
  );
}