﻿using System;

namespace SE.Domain.Exceptions;

public class UserNotFoundException : Exception
{
    private UserNotFoundException() : base("User can't be found.") { }
    public static UserNotFoundException Instance { get; } = new();
}